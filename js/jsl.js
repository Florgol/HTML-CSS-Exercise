class ViewController {

    root;

    constructor() {
        console.log("constructor(): has been called");
    }

    oncreate() {
        console.log("oncreate():root is: ", this.root);
        this.initialiseViewSwitching();
        this.prepareListItemSelection();
        this.prepareAddingNewListitems();
        this.loadAndDisplayListitems();
        this.prepareRefreshButton();
  /*       this.prepareFading(); */
    }

    initialiseViewSwitching() {
        const switchElement = this.root.getElementsByClassName("myapp-img-gridview")[0];
        
        const fadingTarget = this.root.getElementsByTagName("ul")[0];

        switchElement.onclick = () => {

            const switchView = () => {
                this.root.classList.toggle("myapp-tiles");
                if (this.root.classList.contains("myapp-tiles")) {
                    switchElement.style.backgroundImage = "url('./css/img/png/list_FILL0_wght400_GRAD0_opsz24.png')";
                } else {
                    switchElement.style.backgroundImage = "url('./css/img/png/grid_view_FILL0_wght400_GRAD0_opsz24.png')";
                }
                fadingTarget.removeEventListener("transitionend",switchView);
            };

            const onTransitionend = () => {
                fadingTarget.classList.toggle("myapp-faded");
                fadingTarget.removeEventListener("transitionend",onTransitionend);
            };


            fadingTarget.classList.toggle("myapp-faded");

            fadingTarget.addEventListener("transitionend",onTransitionend);
            fadingTarget.addEventListener("transitionend",switchView);
        }
    }

/*     prepareFading() {
        const fadingTrigger = document.getElementById("myapp-fading-trigger");
        const fadingTarget = this.root.getElementsByTagName("main")[0];
        fadingTrigger.onclick = () => {
            fadingTarget.classList.toggle("myapp-faded");
            const onTransitionend = () => {
                fadingTarget.classList.toggle("myapp-faded");
                fadingTarget.removeEventListener("transitionend",onTransitionend);
            };
            fadingTarget.addEventListener("transitionend",onTransitionend);
        }
    } */

    prepareListItemSelection() {


        const onclickListener = (evt) => {
            alert("selected: " + evt.target.closest("li").querySelector(".myapp-li-title").textContent);
        };


/*      const listItems = this.root.getElementsByTagName("li");
        for (let i=0; i<listItems.length;i++){
            let currentli = listItems[i];
            currentli.onclick = onclickListener;
        } */

        const listRoot = this.root.querySelector("ul");
        listRoot.onclick = onclickListener;
    }


    prepareAddingNewListitems () {
        const addingTrigger = this.root.querySelector(".myapp-img-add");
        this.listRoot = this.root.querySelector("ul");

        this.liTemplate = this.listRoot.querySelector("template");

        // for C) in addNewListItem(obj)

/*      this.liTemplate = this.listRoot.querySelector("li");   
        this.liTemplate.parentNode.removeChild(this.liTemplate);
        this.liTemplate.classList.remove("myapp-li-template-hide"); */

        addingTrigger.onclick = () => {

            const srcoptions = ["100_100.jpeg", "100_200.jpeg", "300_100.jpeg"];
            const titleoptions = ["direm", "lopsum", "olor", "elit"];
            const tagCountOptions = ["3434", "176", "45", "503"];
            const srcURLOptions = ["lorempixel.com", "lopsumpixel.com", "olorpixel.com", "elitpixel.com"];
            const dateOptions = ["30.03.2024", "19.03.2024", "11.01.2024", "17.12.2023"];


            const selectedSrc = srcoptions[Date.now() % srcoptions.length];
            const selectedTitle = titleoptions[Date.now() % titleoptions.length];
            const selectedTagCount = tagCountOptions[Date.now() % tagCountOptions.length];
            const selectedURL = srcURLOptions[Date.now() % srcURLOptions.length];
            const now = new Date();
            const selectedDate = now.toLocaleDateString("de-DE");

/*          const selectedDate = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`; */
     

            this.addNewListItem({src: "./data/img/jpeg/" + selectedSrc, title: selectedTitle, 
                owner: selectedURL, numOfTags: selectedTagCount, added: selectedDate});
        }
    }

    addNewListItem(obj) {
        // A) innerHTML: SoC violated, inefficient, transparent (improveable by js string template)
        // Did not work because of ""-comprehension
        // Is way too verbose and we have a lot of html in our JS

        // B) dom element creation: SoC violated, efficient, intransparent
/*         const li = document.createElement("li");
        li.classList.add("myapp-li-container");
    
        // Create and append the image
        const img = document.createElement("img");
        img.src = obj.src;
        img.classList.add("myapp-align-left", "li-album-img");
        li.appendChild(img);
    
        // Create the right column div
        const rightColumn = document.createElement("div");
        rightColumn.classList.add("myapp-li-right-column");
    
        // Create the first row
        const firstRow = document.createElement("div");
        firstRow.classList.add("myapp-li-first-row", "myapp-row-container");
    
        const imgSrcDiv = document.createElement("div");
        imgSrcDiv.classList.add("myapp-li-img-src");
        imgSrcDiv.textContent = "lorempixel.com";
    
        const dateDiv = document.createElement("div");
        dateDiv.classList.add("myapp-li-date");
        dateDiv.textContent = "12.02.2023";
    
        firstRow.appendChild(imgSrcDiv);
        firstRow.appendChild(dateDiv);
        rightColumn.appendChild(firstRow);
    
        // Create the second row
        const secondRow = document.createElement("div");
        secondRow.classList.add("myapp-li-second-row", "myapp-row-container");
    
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("myapp-li-title");
        titleDiv.textContent = obj.title;
    
        secondRow.appendChild(titleDiv);
        rightColumn.appendChild(secondRow);
    
        // Create the third row
        const thirdRow = document.createElement("div");
        thirdRow.classList.add("myapp-li-third-row", "myapp-row-container");
    
        const playArrowImg = document.createElement("img");
        playArrowImg.src = "css/img/png/play_arrow_FILL0_wght400_GRAD0_opsz24.png";
        playArrowImg.classList.add("myapp-align-left", "myapp-li-playarrow");
    
        const tagCountDiv = document.createElement("div");
        tagCountDiv.classList.add("myapp-li-tagcount");
        tagCountDiv.textContent = "8989";
    
        const optionsImg = document.createElement("img");
        optionsImg.src = "css/img/png/more_vert_FILL0_wght400_GRAD0_opsz24.png";
        optionsImg.classList.add("myapp-li-options");
    
        thirdRow.appendChild(playArrowImg);
        thirdRow.appendChild(tagCountDiv);
        thirdRow.appendChild(optionsImg);
        rightColumn.appendChild(thirdRow);
    
        // Append the right column to the list item
        li.appendChild(rightColumn); */

        // C) cloning: SoC preserved (much more than above in A and B), efficient, transparent preserved
/*         const li = this.liTemplate.cloneNode(true);
        li.querySelector(".li-album-img").src = obj.src;
        li.querySelector(".myapp-li-title").textContent = obj.title; */

        // D) html template: SoC preserves (as in C), efficient, standard, transparent (slightly less than C)
        const li = document.importNode(this.liTemplate.content,true).querySelector("li");
        li.querySelector(".li-album-img").src = obj.src;
        li.querySelector(".myapp-li-title").textContent = obj.title;
        li.querySelector(".myapp-li-img-src").textContent = obj.owner;
        li.querySelector(".myapp-li-date").textContent = obj.added;
        li.querySelector(".myapp-li-tagcount").textContent = obj.numOfTags;

        this.listRoot.appendChild(li);

        this.prepareOptionsForListitem(li);
    }
    

    prepareOptionsForListitem (li) {

        const onclickListener = (evt) => {
            evt.stopPropagation();
            const userConfirmedDelete = confirm("Options selected!\n\nTitle: " + evt.target.closest("li").querySelector(".myapp-li-title").textContent +
            "\nURL: " + evt.target.closest("li").querySelector(".myapp-li-img-src").textContent +
            "\n\n Would you like to delete this item?");

            if(userConfirmedDelete){
                evt.target.closest("li").remove();
            }
        };

        const optionsTrigger = li.querySelector(".myapp-li-options");
            optionsTrigger.onclick = onclickListener;
    }

    async loadAndDisplayListitems() {
/*         const request = new XMLHttpRequest();
        request.open("GET", "data/listitems.json");

        request.onload = () => {
            console.log("response status: ", request.status, request.statusText);
            if (request.status === 200){
                const responseText = request.responseText;
                console.log("responseText: " + responseText);
                const responseItems = JSON.parse(responseText);
                console.log(responseItems);
                responseItems.forEach(item => this.addNewListItem(item));
            } else {
                alert("got Error: " + request.status + " " + request.statusText);
            }
        }


        const anotherFunction = () => {
            // runs second, as only after readystate 4, the load event will be triggered
            console.log("readyState: ", request.readyState);
        }

        request.onreadystatechange = anotherFunction;
        request.send();

        // runs first as load event, and also readystatechange event will trigger after (as send() is asynchron method)
        console.log("request has been sent to the server");  */

        // Needed for A,B and C
/*         const fetchPromise = fetch("data/listitems.json");
        console.log("fetch has been called, got: ", fetchPromise); */

        // A) Nearly callback-hell
/*         fetchPromise.then(response => {
            console.log("response: ", response);
            const jsonPromise = response.json();
            jsonPromise.then(jsondata => {
                jsondata.forEach(item => this.addNewListItem(item));
            })
        }) */

        // B) hopefully nicer (no embedding, but chaining)
/*         fetchPromise
            .then(response => {
                return response.json();
            })
            .then(dataitems => {
                dataitems.forEach(item => {
                    this.addNewListItem(item);
                });
            }); */
        
        // C) Same as B, with one liners
/*         fetchPromise
            .then(response => response.json())
            .then(dataitems => dataitems
                .forEach(item => this.addNewListItem(item))); */

        // D)
        const response = await fetch("data/listitems.json");
        const listitems = await response.json();
        listitems.forEach(item => this.addNewListItem(item));



    }

    prepareRefreshButton() {
        const refreshTrigger = this.root.querySelector(".myapp-img-refresh");

        refreshTrigger.onclick = () => {
            this.deleteAllListitems();
            this.loadAndDisplayListitems();
        }
    }

    deleteAllListitems() {
        document.getElementById("myapp-main-list").replaceChildren();
    }



}

window.onload = () => {
    const vc = new ViewController();
    vc.root = document.body;
    vc.oncreate();
}