const FIGURE_TYPES = {
    CIRCLE: 'CIRCLE',
    RECTANGLE: 'RECTANGLE',
    TRIANGLE: 'TRIANGLE',
}

const COLORS = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba]

const targetCircle = {
    x: 100,
    y: 580,
    radius: 50,
    type: FIGURE_TYPES.CIRCLE
};
const targetRect = {
    x: 270,
    y: 525,
    width: 150,
    height: 100,
    type: FIGURE_TYPES.RECTANGLE
};
const targetTriangle = {
    x: 600,
    y: 580,
    side: 110,
    type: FIGURE_TYPES.TRIANGLE
};

const app = new PIXI.Application({
    width: 800,
    height: 650,
    backgroundColor: 0xF3F3F3,
});
document.body.appendChild(app.view);

createTargetCircle(targetCircle.x, targetCircle.y, targetCircle.radius);
createTargetRect(targetRect.x, targetRect.y, targetRect.width, targetRect.height);
createTargetTriangle(targetTriangle.x, targetTriangle.y, targetTriangle.side);

for (let i = 0; i < 3; i++) {
    createCircle(
        Math.floor(Math.random() * Math.random() * (700 - 50) + 50),
        Math.floor(Math.random() * Math.random() * (400 - 100) + 100),
    );
    createRectangle(
        Math.floor(Math.random() * Math.random() * (700 - 50) + 50),
        Math.floor(Math.random() * Math.random() * (400 - 100) + 100),
    );
    createTriangle(
        Math.floor(Math.random() * Math.random() * (700 - 50) + 50),
        Math.floor(Math.random() * Math.random() * (400 - 100) + 100),
    )
}

function createTargetCircle(x, y, radius) {
    const circle = new PIXI.Graphics();
        circle.lineStyle(5);
        circle.drawCircle(0, 0, radius);
    
    const textureCircle = app.renderer.generateTexture(circle);
    const circleSprite = new PIXI.Sprite(textureCircle);
    
    circleSprite.interactive = true;
    
    circleSprite.buttonMode = true;
    
    circleSprite.x = x;
    circleSprite.y = y;
    
    circleSprite.anchor.set(0.5);
    
    circleSprite.type = FIGURE_TYPES.CIRCLE;

    app.stage.addChild(circleSprite);
}

function createTargetRect(x, y, width, height) {
    const rect = new PIXI.Graphics();
        rect.lineStyle(5);
        rect.drawRect(x, y, width, height)

    const rectTexture = app.renderer.generateTexture(rect);
    const rectSprite = new PIXI.Sprite(rectTexture);

    rectSprite.x = x;
    rectSprite.y = y;
    rectSprite.type = FIGURE_TYPES.RECTANGLE;

    app.stage.addChild(rectSprite);
}

function createTargetTriangle(x, y, side) {
    const triangle = new PIXI.Graphics()

    let h = side * (Math.sqrt(3)/2);

    triangle.lineStyle(5)
    triangle.moveTo(0, -h/2)
    triangle.lineTo(-side/2, h/2)
    triangle.lineTo(side/2, h/2)
    triangle.lineTo(0, -h/2)
    
    
    const textureTriangle = app.renderer.generateTexture(triangle);
    const triangleSprite = new PIXI.Sprite(textureTriangle);
    
    triangleSprite.interactive = true;
    
    triangleSprite.buttonMode = true;
    
    triangleSprite.x = x;
    triangleSprite.y = y;
    
    triangleSprite.anchor.set(0.5);
    
    triangleSprite.type = FIGURE_TYPES.TRIANGLE;

    app.stage.addChild(triangleSprite);
}

function createCircle(x, y) {
    const circle = new PIXI.Graphics();
        circle.lineStyle(Math.random() * (40 - 5) + 5, COLORS[Math.floor(Math.random() * COLORS.length)], 1);
        circle.drawCircle(150, 100,30);
        const textureCircle = app.renderer.generateTexture(circle);
        const circleSprite = new PIXI.Sprite(textureCircle);

    circleSprite.interactive = true;

    circleSprite.buttonMode = true;
    
    circleSprite.x = x;
    circleSprite.y = y;
    
    circleSprite.anchor.set(0.5);
    
    circleSprite
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
    
    circleSprite.startX = x;
    circleSprite.startY = y;
    circleSprite.type = FIGURE_TYPES.CIRCLE;
    
    app.stage.addChild(circleSprite);
}

function createRectangle(x, y) {
    const rect = new PIXI.Graphics();
        rect.beginFill(COLORS[Math.floor(Math.random() * COLORS.length)]);
        rect.drawRect(0, 0, Math.floor(Math.random() * (90 - 50) + 50), Math.floor(Math.random() * (90 - 50) + 50))
        rect.endFill();
    
    const rectTexture = app.renderer.generateTexture(rect);
    const rectSprite = new PIXI.Sprite(rectTexture);
    
    rectSprite.interactive = true;
    
    rectSprite.buttonMode = true;
    
    rectSprite.x = x;
    rectSprite.y = y;
    
    rectSprite.anchor.set(0.5);

    rectSprite.rotation = Math.random() * (90 - 50) + 50
    
    rectSprite
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
    
    rectSprite.startX = x;
    rectSprite.startY = y;
    rectSprite.type = FIGURE_TYPES.RECTANGLE;

    app.stage.addChild(rectSprite);
}

function createTriangle(x, y) {
    const side = Math.floor(Math.random() * (90 - 50) + 50);
    const h = side * (Math.sqrt(3)/2);

    const triangle = new PIXI.Graphics();
        triangle.lineStyle(5, COLORS[Math.floor(Math.random() * COLORS.length)])
        triangle.moveTo(0, -h/2)
        triangle.lineTo(-side/2, h/2)
        triangle.lineTo(side/2, h/2)
        triangle.lineTo(0, -h/2)
    
    const  triangleTexture = app.renderer.generateTexture(triangle);
    const  triangleSprite = new PIXI.Sprite(triangleTexture);
    
    triangleSprite.interactive = true;
    
    triangleSprite.buttonMode = true;

    triangleSprite.x = x;
    triangleSprite.y = y;
    
    triangleSprite.anchor.set(0.5);
    triangleSprite.rotation = Math.random() * (90 - 50) + 50

    triangleSprite
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
    
    triangleSprite.startX = x;
    triangleSprite.startY = y;
    triangleSprite.type = FIGURE_TYPES.TRIANGLE;

    app.stage.addChild(triangleSprite);
}


function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;

    if (isTargetCircle(this.x, this.y)) {
        if (this.type === targetCircle.type) {
            app.stage.removeChild(this);
        } else {
            this.x = this.startX;
            this.y = this.startY;
        }
    }
    
    if (isTargetRectangle(this.x, this.y)) {
        if (this.type === targetRect.type) {
            app.stage.removeChild(this);
        } else {
            this.x = this.startX;
            this.y = this.startY;
        }
    }

    if (isTargetTriangle(this.x, this.y)) {
        if (this.type === targetTriangle.type) {
            app.stage.removeChild(this);
        } else {
            this.x = this.startX;
            this.y = this.startY;
        }
    }
}

function onDragMove(e) {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}

function isTargetCircle (x, y) {
    return x >= targetCircle.x - targetCircle.radius
        && y >= targetCircle.y - targetCircle.radius
        && y <= targetCircle.y + targetCircle.radius
        && x <= targetCircle.x + targetCircle.radius
}

function isTargetRectangle (x, y) {
    return x >= targetRect.x
        && x <= targetRect.x + targetRect.width
        && y >= targetRect.y
        && y <= targetRect.y + targetRect.height
}

function isTargetTriangle (x, y) {
    return x >= targetTriangle.x - (targetTriangle.side/2)
        && x <= targetTriangle.x + (targetTriangle.side/2)
        && y >= targetTriangle.y - (targetTriangle.side/2)
        && y <= targetTriangle.y + (targetTriangle.side/2)
}