class three_sixty {
    ready = false;
    dragging = false;
    pointerStartPosX = 0;
    pointerEndPosX = 0;
    pointerDistance = 0;
    monitorStartTime = 0;
    monitorInt = 10;
    ticker = 0;
    speedMultiplier = 10;
    spinner:any;
    totalFrames = 51;
    currentFrame = 0;
    frames:HTMLImageElement[] = [];
    endFrame = 0;
    loadedImages = 0; 
    imageContainer:React.RefObject<HTMLDivElement>;
    path: string;

    constructor(imageContainer:React.RefObject<HTMLDivElement>, path: string){
        this.imageContainer = imageContainer;
        this.path = path;
        this.loadImage();
        this.addEventListenerImage();
        this.addEventListenerDocument();
    }


    loadImage() {
        const imgName = this.path + (this.loadedImages + 1) + ".jpg";
        var image = document.createElement("img");
        image.setAttribute("src",   imgName);
        image.className = "product360__prevImg";
        this.frames.push(image);
        if(this.imageContainer.current){
            this.imageContainer.current.appendChild(image);
        }
        image.addEventListener("load", () => {
            this.imageLoaded();
        })
    }
    imageLoaded() {
        this.loadedImages++;
        if(this.loadedImages === this.totalFrames){
            this.frames[0].className="product360__nextImg";
            this.showThreesixty();
        }else{
            this.loadImage();
        }
    }
    showThreesixty() {
        this.ready = true;
        this.endFrame = -720;
        // this.refresh()
    } 
    // refresh() {
    //     if(!this.ticker){
    //         setInterval(this.render, Math.round(1000/60));
    //     }
    // }
    render() {
        console.log(this.currentFrame, this.endFrame);
        if(this.currentFrame !== this.endFrame){
            // console.log("Hello!")
            var frameEasing = this.endFrame < this.currentFrame ? Math.floor((this.endFrame - this.currentFrame) * 0.1) : Math.ceil((this.endFrame - this.currentFrame) * 0.1);
            this.hidePreviousFrame();
            this.currentFrame += frameEasing;
            this.showCurrentFrame();
        }else{
            window.clearInterval(this.ticker);
            this.ticker = 0;
        }
    }
    hidePreviousFrame() {
        console.log("hiding!")
        this.frames[this.getNormalizedCurrentFrame()].className = "product360__prevImg";
    }
    showCurrentFrame() {
        this.frames[this.getNormalizedCurrentFrame()].className = "product360__nextImg";
    }   
    getNormalizedCurrentFrame():number {
        console.log("current frame: ", this.currentFrame)
        var c = -Math.ceil(this.currentFrame % this.totalFrames);
        if (c < 0) {
            c+= (this.totalFrames - 1);
        }
        return c;
    }
    // getPointerEvent(ev:any){
    //     return ev.originalEvent.targetTouches ? ev.originalEvent.targetTouches[0] : ev;
    // }
    addEventListenerImage(){
       if(this.imageContainer.current){
           this.imageContainer.current.addEventListener("mousedown", (ev)=> {
            //    ev.preventDefault();
            //TODO: fix position so it only gives x based on the container;
            this.pointerStartPosX = ev.pageX;
               this.dragging = true;
           })
           this.imageContainer.current.addEventListener("touchstart", (ev)=> {
               ev.preventDefault();
            //    this.pointerStartPosX = this.getPointerEvent(ev).pageX;
            this.pointerStartPosX = ev.touches[0].pageX;
               this.dragging = true;
           })
           this.imageContainer.current.addEventListener("touchmove", (ev)=> {
               ev.preventDefault();
               this.trackPointer(ev);
           })
           this.imageContainer.current.addEventListener("touchend", (ev) =>{
               ev.preventDefault();
               this.dragging = false;
           })
       }
    }
    addEventListenerDocument() {
        document.addEventListener("mouseup", (ev)=> {
            ev.preventDefault();
            this.dragging = false;
        })
        document.addEventListener("mousemove", (ev)=> {
            ev.preventDefault();
            this.trackPointer(ev);
        })
    }
    trackPointer(ev:any){
        var userDragging = this.ready && this.dragging ? true : false;
        if(userDragging){
            // this.pointerEndPosX = this.getPointerEvent(ev).pageX;
            this.pointerEndPosX = ev.pageX;
            if(this.monitorStartTime < new Date().getTime() - this.monitorInt && this.imageContainer.current) {
                this.pointerDistance = this.pointerEndPosX - this.pointerStartPosX;
                this.endFrame = this.currentFrame + Math.ceil((this.totalFrames - 1) * this.speedMultiplier * (this.pointerDistance / this.imageContainer.current.getBoundingClientRect().width));
                // this.refresh();
                this.monitorStartTime = new Date().getTime();
                // this.pointerStartPosX = this.getPointerEvent(ev).pageX;
                this.pointerStartPosX = ev.pageX;
            }
        }else return;
    }
}   
export default three_sixty;