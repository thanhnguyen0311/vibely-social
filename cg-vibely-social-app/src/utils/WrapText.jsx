function WrapText({content}) {
    let newText = content.replace(/\r/g, " ");
    newText = content.replace(/([^\n]{1,250})\s/, '$1\n')
    return ( 
        <span 
            style={content?.length <65 
                ? {whiteSpace: "pre-wrap", overflow:"hidden"} 
                : {whiteSpace: "pre-wrap", overflow:"hidden"} }>
            {newText}
        </span>
     );
}

export default WrapText;