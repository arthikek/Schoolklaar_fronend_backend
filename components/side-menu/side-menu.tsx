import Link from "next/link";
import { Images } from "../images";
import Typography from "../typography";
import PageMenu from "./page-menu";
import Profile from "./profile";
import SettingsMenu from "./settings-menu";





export default function SideMenu() {
    return (
        <div className="lg:flex-inline  h-screen w-[300px] lg:w-[350px] bg-secondary overflow-hidden border-r-[1px] border-[#EFEFEF]">

            <div className="hidden lg:block w-full h-[42vh] absolute bottom-0 overflow-hidden ">
                <Images.bottom />

            </div>

            <Link href='/authenticated/overzicht' className="my-8 mx-12 flex flex-row items-center z-1">
                <Images.logo width={70}/>
                <Typography variant='title' className="text-quintary font-medium lg:text-3xl ml-6">Schoolklaar</Typography>
            </Link>
            
            <div className="px-2 pr-4">
                <div>
                    <PageMenu />
                </div>
            </div>  

        </div>
    )
}