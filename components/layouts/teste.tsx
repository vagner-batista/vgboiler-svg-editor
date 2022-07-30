import { ChangeEvent, MouseEventHandler, useRef, useState } from 'react';

export type Controller = {
    onDrag: Function;
    onMouseLeave: Function;
};

export type ImouseController = {
    mouseDown: boolean;
    mouseDownX: number;
    mouseDownY: number;
    controllers: { [key: string]: Controller };
    activeController: Controller | null;
    attach: Function;
    detach: Function;
    onMouseMove: Function;
    onMouseDown: Function;
    onMouseUp: Function;
    onMouseLeave: Function;
    clearSelectedObj: Function;
};

//// MouseController obj
const MouseController = () => {
    const LEFT_BUTTON = 0;

    const attachController = (svgElement: Element, controller: Controller) => {
        const id = svgElement.getAttribute('id');
        if (typeof id === 'string') {
            mouseController.controllers[id] = controller;
        }
    };

    const detachController = (svgElement: Element) => {
        const id = svgElement.getAttribute('id');
        if (id && id in Object.keys(mouseController.controllers))
            delete mouseController.controllers[id];
    };

    const onMouseDown = (evt: MouseEvent) => {
        if (evt.button !== LEFT_BUTTON) return;
        evt.preventDefault();
        const id = (evt.currentTarget as Element).getAttribute('id');
        if (id && typeof id === 'string')
            mouseController.activeController = mouseController.controllers[id];
        mouseController.mouseDown = true;
        mouseController.mouseDownX = evt.clientX;
        mouseController.mouseDownY = evt.clientY;
    };

    const onMouseMove = (evt: MouseEvent) => {
        evt.preventDefault();
        if (mouseController.mouseDown && mouseController.activeController !== null)
            mouseController.activeController.onDrag(evt);
    };

    const onMouseUp = (evt: MouseEvent) => {
        if (evt.button === LEFT_BUTTON) {
            evt.preventDefault();
            mouseController.clearSelectedObj();
        }
    };

    const onMouseLeave = (evt: MouseEvent) => {
        evt.preventDefault();
        if (
            mouseController.mouseDown &&
            mouseController.activeController !== null
        ) {
            mouseController.activeController.onMouseLeave();
        }
    };

    const clearSelectedObj = () => {
        mouseController.mouseDown = false;
        mouseController.activeController = null;
    };

    const mouseController: ImouseController = {
        mouseDown: false,
        mouseDownX: 0,
        mouseDownY: 0,
        controllers: {},
        activeController: null,
        attach: attachController,
        detach: detachController,
        onMouseDown: onMouseDown,
        onMouseUp: onMouseUp,
        onMouseLeave: onMouseLeave,
        onMouseMove: onMouseMove,
        clearSelectedObj: clearSelectedObj,
    };

    return mouseController;
};

export type ISVGObject = {
    mouseController: ImouseController;
    events: Array<IEvent>;
    X: number;
    Y: number;
    dragX: number;
    dragY: number;
    registerEvent: Function;
    destroy: Function;
    registerEventListener: Function;
    startMove: Function;
    updatePosition: Function;
};

export type IEvent = {
    element: SVGElement;
    eventName: string;
    callbackRef: Function;
};

const SVGObject = (
    mouseController: ImouseController,
    svgElement: Element
): ISVGObject => {
    // Registrar eventos para poder remove-los
    const registerEvent = (
        element: SVGElement,
        eventName: string,
        callbackRef: Function
    ) => {
        svgObject.events.push({
            element: element,
            eventName: eventName,
            callbackRef: callbackRef,
        });
    };

    const destroy = () => {
        unhookEvents();
    };

    const unhookEvents = () => {
        svgObject.events.map((event) => {
            event.element.removeEventListener(
                event.eventName,
                event.callbackRef as EventListener
            );
        });
        svgObject.events = [];
    };

    const startMove = (evt: MouseEvent) => {
        svgObject.dragX = evt.clientX;
        svgObject.dragY = evt.clientY;
    }

    const registerEventListener = (
        element: SVGElement,
        eventName: string,
        callback: Function
    ) => {
        element.addEventListener(
            eventName as keyof SVGElementEventMap,
            callback as EventListener
        );
    };

    const updatePosition = (evt: MouseEvent) => {
        const mouseX = evt.clientX;
        const mouseY = evt.clientY;
        const mouseDX = mouseX - svgObject.mouseController.mouseDownX;
        const mouseDY = mouseY - svgObject.mouseController.mouseDownY;
        svgObject.X += mouseDX;
        svgObject.Y += mouseDY;
        svgObject.mouseController.mouseDownX = mouseX;
        svgObject.mouseController.mouseDownY = mouseY;
    }

    const onMouseLeave = (evt: MouseEvent) => {

    }

    const svgObject = {
        mouseController: mouseController,
        events: [] as IEvent[],
        X: 0,
        Y: 0,
        dragX: 0,
        dragY: 0,
        element: svgElement,
        registerEvent: registerEvent,
        destroy: destroy,
        registerEventListener: registerEventListener,
        startMove: startMove,
        updatePosition: updatePosition,
        onMouseLeave: onMouseLeave,
    };

    return svgObject;
};

const SVGElementFactory = (mouseController: ImouseController, svgElement: SVGElement) => {

}

interface ITeste {
    gridW: number;
    gridH: number;
    width: number;
    height: number;
    smW: number;
    smH: number;
}

const MySVG = ({
    width = 801,
    height = 481,
    gridW = 80,
    gridH = 80,
    smW = 8,
    smH = 8,
}: ITeste) => {
    const grid = {
        cellW: gridW,
        cellH: gridH,
        smW: smW,
        smH: smH,
    };

    const LEFT_BUTTON = 0;

    const confs = {
        mouseDown: false,
        mouseDownX: 0,
        mouseDownY: 0,
        gridX: 0,
        gridY: 0,
    };

    const onMouseDown = (evt: MouseEvent) => {
        if (evt.button == LEFT_BUTTON) {
            evt.preventDefault();
            confs.mouseDown = true;
            confs.mouseDownX = evt.clientX;
            confs.mouseDownY = evt.clientY;
        }
    };

    const onMouseUp = (evt: MouseEvent) => {
        if (evt.button === LEFT_BUTTON) {
            evt.preventDefault();
            confs.mouseDown = false;
        }
    };

    const onMouseMove = (evt: MouseEvent) => {
        if (!confs.mouseDown) return;
        evt.preventDefault();
        const mouseX = evt.clientX;
        const mouseY = evt.clientY;
        const mouseDX = mouseX - confs.mouseDownX;
        const mouseDY = mouseY - confs.mouseDownY;
        confs.gridX += mouseDX;
        confs.gridY += mouseDY;
        confs.mouseDownX = mouseX;
        confs.mouseDownY = mouseY;
        const dx = confs.gridX % grid.cellW;
        const dy = confs.gridY % grid.cellH;
        if (evt?.currentTarget)
            (evt.currentTarget as SVGRectElement).setAttribute(
                'transform',
                `translate(${dx}, ${dy})`
            );
        if (objects.current)
            (objects.current as SVGElement).setAttributeNS(
                null,
                'transform',
                `translate(${confs.gridX}, ${confs.gridY})`
            );
    };

    const onMouseLeave = (evt: Event) => {
        evt.preventDefault();
        confs.mouseDown = false;
    };

    const objects = useRef(null);

    return (
        <>
            <svg
                id="svg"
                width={width}
                height={height}
                style={{ border: '1px solid green', margin: 'auto' }}
            >
                <defs>
                    <pattern
                        id="smallGrid"
                        width={grid.smW}
                        height={grid.smH}
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d={`M ${grid.smW} 0 H 0 V ${grid.smH}`}
                            fill="none"
                            stroke="gray"
                            strokeWidth={0.5}
                        />
                    </pattern>
                    <pattern
                        id="grid"
                        width={grid.cellW}
                        height={grid.cellH}
                        patternUnits="userSpaceOnUse"
                    >
                        <rect
                            width={grid.cellW}
                            height={grid.cellH}
                            fill="url(#smallGrid"
                        />
                        <path
                            d={`M ${grid.cellW} 0 H 0 V ${grid.cellH}`}
                            fill="none"
                            stroke="gray"
                            strokeWidth={2}
                        />
                    </pattern>
                </defs>

                <rect
                    id="surface"
                    x={-grid.cellW}
                    y={-grid.cellH}
                    width={width + grid.cellW * 2}
                    height={height + grid.cellH * 2}
                    fill="url(#grid)"
                    onMouseDown={
                        onMouseDown as unknown as MouseEventHandler<SVGRectElement>
                    }
                    onMouseUp={onMouseUp as unknown as MouseEventHandler<SVGRectElement>}
                    onMouseLeave={
                        onMouseLeave as unknown as MouseEventHandler<SVGRectElement>
                    }
                    onMouseMove={
                        onMouseMove as unknown as MouseEventHandler<SVGRectElement>
                    }
                />

                <g id="objects" transform="translate(0, 0)" ref={objects}>
                    <circle
                        cx="150"
                        cy="100"
                        r="40"
                        stroke="black"
                        strokeWidth="1"
                        fill="#FFC0C0"
                    />
                    <circle
                        cx="175"
                        cy="125"
                        r="40"
                        stroke="black"
                        strokeWidth="1"
                        fill="#C0FFC0"
                    />
                </g>
            </svg>
        </>
    );
};

const Teste: React.FC = () => {
    const [svgConfig, setSVGConfig] = useState({
        width: 1000,
        height: 900,
        gridW: 100,
        gridH: 100,
        smW: 10,
        smH: 10,
        gridView: true,
    });

    const onChangeSizes = (evt: ChangeEvent) => {
        const value = parseInt((evt.target as HTMLInputElement).value);
        const prop = evt.target.id;

        if (
            typeof value !== 'number' ||
            (evt.target as HTMLInputElement).value === ''
        )
            return;
        changeSizes(prop, value);
    };

    const changeSizes = (target: string, value: number) => {
        const tmpObj: { [key: string]: number } = {};
        tmpObj[target] = value;
        setSVGConfig({
            ...svgConfig,
            ...tmpObj,
        });
    };

    const [gridConfigVisibility, toogleGridConfigVisibility] = useState(true);

    return (
        <div
            style={{
                alignContent: 'center',
                width: '100%',
                display: 'flex',
                height: '900px',
            }}
        >
            <MySVG {...svgConfig} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                }}
                id="grid-properties"
            >
                <div
                    style={{
                        flexShrink: 0,
                        backgroundColor: 'white',
                        padding: '10px',
                        border: 'solid 2px grey',
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}
                >
                    <h3
                        style={{
                            cursor: 'pointer',
                            userSelect: 'none',
                            textAlign: 'center',
                            backgroundColor: '#5599FF',
                            marginLeft: '-10px',
                            marginRight: '-10px',
                            marginTop: '-10px',
                        }}
                        onClick={() => toogleGridConfigVisibility(!gridConfigVisibility)}
                    >
                        Grade
                    </h3>
                    <div
                        style={{
                            maxHeight: `${gridConfigVisibility ? '300px' : '0px'}`,
                            paddingBottom: '-5px',
                        }}
                    >
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '3px',
                            }}
                        >
                            <label htmlFor="width">Width</label>
                            <input
                                id="width"
                                type="number"
                                onChange={onChangeSizes}
                                style={{ width: '40%' }}
                            />
                        </span>
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingBottom: '5px',
                            }}
                        >
                            <label htmlFor="height">Height</label>
                            <input
                                id="height"
                                type="number"
                                onChange={onChangeSizes}
                                style={{ width: '40%' }}
                            />
                        </span>
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingBottom: '5px',
                            }}
                        >
                            <label htmlFor="gridW">GridW</label>
                            <input
                                id="gridW"
                                type="number"
                                onChange={onChangeSizes}
                                style={{ width: '40%' }}
                            />
                        </span>
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingBottom: '5px',
                            }}
                        >
                            <label htmlFor="gridH">GridH</label>
                            <input
                                id="gridH"
                                type="number"
                                onChange={onChangeSizes}
                                style={{ width: '40%' }}
                            />
                        </span>
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingBottom: '5px',
                            }}
                        >
                            <label htmlFor="smGridW">SmGridW</label>
                            <input
                                id="smW"
                                type="number"
                                onChange={onChangeSizes}
                                style={{ width: '40%' }}
                            />
                        </span>
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingBottom: '5px',
                            }}
                        >
                            <label htmlFor="smGridH">SmGridH</label>
                            <input
                                id="smH"
                                type="number"
                                onChange={onChangeSizes}
                                style={{ width: '40%' }}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Teste;
