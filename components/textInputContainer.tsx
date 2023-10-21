import Typography from "./typography";







export default function TextInputContainer({input, handleInputChange} : any) {
    return (
        <>
            {input.map((text : any, index : number) => {
                const title = text.title.toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/\*$/, '')
                return (
                    <div>
                        <Typography variant='muted' className="my-2 font-medium">{text.title}</Typography>
                    
                            {text.type === 'textArea' ? 
                            (<textarea 
                                name={title}
                                className="w-full border bg-white border-[#ABABAB] text-dark/60 p-4 rounded-xl"
                                placeholder={text.placeHolder}
                                key={index}
                                rows={12}
                                onChange={handleInputChange}
                            />) :
                            text.type === 'numberInput' ? 
                            ( 
                                <div className="border bg-white border-[#ABABAB] rounded-xl p-1">
                                    <select 
                                    name={title}
                                    className={`w-full bg-white p-3`}
                                    style = {{color: '#121212'}}
                                    onChange={handleInputChange}
                                    >
                                        <option><span className="text-[#8D94A0]">{text.placeHolder}</span></option>
                                        {[...Array(5)].map((_, index) => (
                                            <option key={index + 1} value={index + 1}>
                                                {index + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) :
                            text.type === 'customInput' ? 
                            (
                                <div className="border bg-white border-[#ABABAB] rounded-xl  p-4">
                                    <select 
                                    name={title}
                                    className={`w-full bg-white `}
                                    style = {{color: '#121212'}}
                                    onChange={handleInputChange}
                                    >
                                        <option><span className="text-dark/60">{text.placeHolder}</span></option>
                                        {text.iterable?.map((it : any, index : any) => (
                                            <option key={index + 1} value={it.id? it.id : it}>
                                                {it.naam ? it.naam : it}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) :
                            (
                                <input 
                                    type={text.type}
                                    name={title}
                                    className="w-full border bg-white border-[#ABABAB] text-dark/60 p-4 rounded-xl"
                                    placeholder={text.placeHolder}
                                    key={index}
                                    onChange={handleInputChange}
                                />
                            )
                        }
                    </div>
                )})}
        </>
    )
}