import { Icons } from "@/components/icons"
import Typography from "@/components/typography"
import { poppins } from "@/lib/fonts"



export default function TextInputCheckBox({input, handleInputChange, handleCheckboxChange} : any) {

    return (
        <>
        {input.map((text : any, index : number) => {
            const title = text.title.toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/\*$/, '')
            return (
                <div key={index}>
                    <Typography variant='muted' className="my-2 font-medium">{text.title}</Typography>
                    {text.type === 'checkbox' ? 
                        (
                        <>
                            <Typography variant = 'muted' className={`text-[#8D94A0] mb-1 lg:text-sm ${poppins.className}`}>{text.placeHolder}</Typography>
                            <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-4 gap-x-12 ">
                                {text.iterable?.map((course : any) => {
                                return(
                                    <div className="custom-checkbox" key={course}>
                                        <label>
                                            <input 
                                                name={title}
                                                type="checkbox" 
                                                id={course} 
                                                onChange={handleCheckboxChange}
                                                />
                                            <span className="checkbox-circle border-[#908f8f]"></span>
                                            <Typography variant = 'muted' className='text-dark text-sm lg:text-sm'>{course}</Typography>
                                        </label>
                                    </div>
                                )})}
                            </div>
                        </>
                        ):
                        text.type === 'numberInput' ? 
                        (
                            <div className="relative flex flex-col items-center border bg-white border-[#ABABAB] rounded-xl">
                            <select
                              name={title}
                              className="appearance-none w-full px-4 py-2 h-full bg-transparent text-dark"
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