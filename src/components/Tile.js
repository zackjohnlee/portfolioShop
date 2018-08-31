import React from 'react';

const Tile = React.forwardRef((props, ref) => {
    return (
        <div 
            className={"tile"}
            style={props.style}
            ref={ref}
            onClick={() => props.click(props.tile, ref)} 
            data-source={require("../images/"+ props.tile.col + "/lores/" + props.tile.src + ".jpg")}>
            <img className={"image"} 
                src={props.src}/>
        </div>
    );
});

export default Tile;