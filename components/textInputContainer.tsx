import { Icons } from "./icons";
import Typography from "./typography";
import { useGeneralContext } from "@/context/leerling-provider";

export default function TextInputContainer({
  input,
  handleInputChange,
  handleFileChange,
}: any) {
  // Fetch the general context which contains data like vakken, leerlingen, etc.
  const { generalContext } = useGeneralContext();

  // Extract the required data from the general context

  return (
    <>
      {/* Map over the input array to render different types of input fields */}
      {input.map((text: any, index: number) => {
        // Convert the title to a format suitable for the 'name' attribute of the input
        const title = text.title === "Leerling" ? "Leerling" : text.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "")
        .replace(/\*$/, "");
      

        return (
          <div key={index}>
            {/* Display the title of the input */}
            <Typography variant="muted" className="my-2 font-medium">
              {text.title}
            </Typography>
            {/* Check the type of the input and render the appropriate input field */}
            {text.type === "file" ? (
              // Render a file input
              <input
                type="file"
                name={title}
                className="w-full border bg-white border-[#ABABAB] text-dark/60 p-4 rounded-xl"
                placeholder={text.placeHolder}
                key={index}
                onChange={handleFileChange}
              />
            ) : text.type === "range" ? (
              // Render a custom dropdown based on the provided iterable (e.g., vakken, leerlingen)
              <div className="border bg-white border-[#ABABAB] rounded-xl  p-4">
                <select
                  name={title}
                  className={`w-full bg-white `}
                  style={{ color: "#121212" }}
                  onChange={handleInputChange}
                >
                  <option>
                    <span className="text-dark/60">{text.placeHolder}</span>
                  </option>
                  {(() => {
                    const options = [];
                    if (text.iterable) {
                      for (let i = 0; i < text.iterable.length; i++) {

                        const it = text.iterable[i];
                
                        options.push(
                          <option key={i} value={it}>
                            {it}
                          </option>
                        );
                      }
                    }
                   
                    return options;
                  })()}
                </select>
              </div>
            ) : text.type === "customInput" ? (
              // Render a custom dropdown based on the provided iterable (e.g., vakken, leerlingen)
              <div className="border bg-white border-[#ABABAB] rounded-xl  p-4">
                <select
                  name={title}
                  className={`w-full bg-white `}
                  style={{ color: "#121212" }}
                  onChange={handleInputChange}
                >
                  <option>
                    <span className="text-dark/60">{text.placeHolder}</span>
                  </option>
                  {text.iterable?.map((it: any, index: any) => {
                    return (
                      <option key={index + 1} value={it.id}>
                        {it.naam}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : text.type === "nameInput" ? (
              // Render a custom dropdown based on the provided iterable (e.g., vakken, leerlingen)
              <div className="border bg-white border-[#ABABAB] rounded-xl  p-4">
                <select
                  name={title}
                  className={`w-full bg-white `}
                  style={{ color: "#121212" }}
                  onChange={handleInputChange}
                >
                  <option>
                    <span className="text-dark/60">{text.placeHolder}</span>
                  </option>
                  {text.iterable?.map((it: any, index: any) => {
                    return (
                      <option key={index + 1} value={it.id}>
                        {it.naam + " " + it.achternaam}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              // Render a default text input for other types
              <input
                type={text.type}
                name={title}
                className="w-full border bg-white border-[#ABABAB] text-dark/60 p-4 rounded-xl"
                placeholder={text.placeHolder}
                key={index}
                onChange={handleInputChange}
              />
            )}
          </div>
        );
      })}
    </>
  );
}


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
                                <div className="relative flex flex-col items-center border bg-white border-[#ABABAB] rounded-xl">
                                    <select
                                    name={title}
                                    className="appearance-none w-full p-4 h-full bg-transparent text-dark"
                                    style={{ color: '#121212' }}
                                    onChange={handleInputChange}
                                    >
                                    <option disabled><span className="text-dark/60">{text.placeHolder}</span></option>
                                    {[...Array(5)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                        </option>
                                    ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-4">
                                    {/* Insert your arrow icon component here */}
                                    <Icons.arrowDown className="text-[#8D94A0]"/>
                                    </div>
                              </div>
                            ) :
                            text.type === 'customInput' ? 
                            (
                                <div className="relative flex flex-col items-center border bg-white border-[#ABABAB] rounded-xl">
                                <select
                                  name={title}
                                  className="appearance-none w-full p-4 h-full bg-transparent text-dark"
                                  style={{ color: '#121212' }}
                                  onChange={handleInputChange}
                                >
                                  <option disabled><span className="text-dark/60">{text.placeHolder}</span></option>
                                  {text.iterable?.map((it : any, index : any) => (
                                    <option key={index} value={it}>
                                      {it}
                                    </option>
                                  ))}
                                </select>
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-4">
                                  {/* Insert your arrow icon component here */}
                                  <Icons.arrowDown className="text-[#8D94A0]"/>
                                </div>
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