class MenuCard extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        wrapperClass: "menu-wrapper",
        backgroundClass: "menu-background",
        addContentClass: "restaurant-add-content",
        contentClass: "menu-content",
        restNameClass: "restorent-name",
        restDescClass: "restorent-discription",
        menuListGroupClass: "menu-list-group",
        menuListHeadingClass: "menu-list-heading",
        menuListImageClass: "menu-list-image",
        menuListImage2Class: "menu-list-image2",
        menuListClass: "menu-list",
        menuListItemClass: "menu-list-item",
        menuListItemNameClass: "menu-list-item-name",
        menuListItemPriceClass: "menu-list-item-price"
    };

    defaultData = {
        restaurant: {
            name: "Shodwe Cafe",
            description: "Drink Menu",
            phone: "+91 0987654321",
            web: "www.reallygratsite.com",
            email: "reallygratsite@gmail.com"
        },
        menu: [
            {
                heading: "COFFEE",
                image: "./IMG/coffee.png",
                imageClass: "img1 img-hover",
                items: [
                    { name: "Cafe Latte", price: 15 },
                    { name: "Cappucino", price: 15 },
                    { name: "Mochacino", price: 15 },
                    { name: "Americano", price: 15 }
                ]
            },
            {
                heading: "NON COFFEE",
                image: "./IMG/juice.png",
                imageClass: "img3 img-hover",
                image2: true,
                items: [
                    { name: "Chocolate Ice", price: 15 },
                    { name: "Red Velvet", price: 15 },
                    { name: "Blue Mojito", price: 15 },
                    { name: "Hazelnut", price: 15 }

                ]
            }
        ]
    };

    config = {};
    data = {};

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.data) {
            this.data = Object.assign({}, this.defaultData, this.data);
        } else {
            this.data = { ...this.defaultData };
        }
        if (this.config) {
            this.config = Object.assign({}, this.defaultConfig, this.config);
        } else {
            this.config = { ...this.defaultConfig };
        }
        this.renderComponent();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        try {
            if (name == 'config' && typeof newValue == 'string') {
                this.config = Object.assign(this.config, JSON.parse(newValue));
            }
            if (name == 'data' && typeof newValue == 'string') {
                this.data = Object.assign(this.data, JSON.parse(newValue));
            }
        } catch (e) {
            // ignore
        }
        this.renderComponent();
    }

    renderComponent() {
        this.innerHTML = '';
        const wrapper = this;

         // Contact Info
        const addContent = this.div(this.config.addContentClass);
        addContent.innerHTML = `
            <div class="restaurant-phone">
                <i class="bi bi-telephone"></i>
                <span class="org-phone-lable"></span>
                <span class="org-phone-number">${this.data.restaurant.phone}</span>
            </div>
            <div class="restaurant-web">
                <i class="bi bi-search"></i>
                <span class="org-web-lable"></span>
                <span class="org-web-address">${this.data.restaurant.web}</span>
            </div>
            <div class="restaurant-email">
                <i class="bi bi-envelope"></i>
                <span class="org-email-lable"></span>
                <span class="org-email-address">${this.data.restaurant.email}</span>
            </div>
        `;
        wrapper.appendChild(addContent);

        // Menu Content
        const content = this.div(this.config.contentClass);

        // Restaurant name & description
        const nameDiv = this.div(this.config.restNameClass, this.data.restaurant.name);
        const descDiv = this.div(this.config.restDescClass, this.data.restaurant.description);
        content.appendChild(nameDiv);
        content.appendChild(descDiv);

        // Menu groups
        this.data.menu.forEach((group, idx) => {
            const groupDiv = this.div(this.config.menuListGroupClass);

            // Heading
            const headingDiv = this.div(this.config.menuListHeadingClass, group.heading);
            groupDiv.appendChild(headingDiv);

            // Image
            let imgDiv;
            if (group.image2) {
                imgDiv = this.div(this.config.menuListImage2Class);
            } else {
                imgDiv = this.div(this.config.menuListImageClass);
            }
            imgDiv.innerHTML = `<img src="${group.image}" class="${group.imageClass}">`;
            groupDiv.appendChild(imgDiv);

            // Items
            const listDiv = this.div(this.config.menuListClass);
            group.items.forEach(item => {
                const itemDiv = this.div(this.config.menuListItemClass);
                const nameSpan = document.createElement('span');
                nameSpan.className = this.config.menuListItemNameClass;
                nameSpan.textContent = item.name;
                const priceSpan = document.createElement('span');
                priceSpan.className = this.config.menuListItemPriceClass;
                priceSpan.innerHTML = `&#36; ${item.price}`;
                itemDiv.appendChild(nameSpan);
                itemDiv.appendChild(priceSpan);
                listDiv.appendChild(itemDiv);
                listDiv.appendChild(document.createElement('br'));
            });
            groupDiv.appendChild(listDiv);

            content.appendChild(groupDiv);
        });

        wrapper.appendChild(content);
        // this.appendChild(wrapper);
    }

    div(className, content) {
        const d = document.createElement('div');
        d.className = className;
        if (content) d.innerHTML = content;
        return d;
    }
}

customElements.define('menu-card', MenuCard);

if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push({ component: 'menu-card', componentClass: MenuCard });