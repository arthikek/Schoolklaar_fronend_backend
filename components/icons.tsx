
import Image from 'next/image';
import google from '../public/icons/google-1.svg';
import {
  AlignRight,
  Brain,
  Facebook,
  Linkedin,
  Loader2,
  LucideProps,
  Moon,
  Phone,
  LogOut,
  PhoneCall,
  SunMedium,
  Twitter,
  Mail,
  Settings,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ScrollText, 
  UserPlus2,
  Contact2,
  Shell,
  Download,
  Layers,
  FolderPlus,

} from 'lucide-react';

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  mail: Mail,
  menu: AlignRight,
  loader: Loader2,
  contact: Contact2,
  x: X,
  download: Download,
  folderPlus: FolderPlus,
  layers: Layers,
  shell: Shell,
  userPlus: UserPlus2,
  scrollText: ScrollText,
  logOut: LogOut,
  settings: Settings,
  phone: Phone,
  arrowRight: ChevronRight,
  arrowLeft: ChevronLeft,
  arrowDown: ChevronDown,
  formSecond: (props : any) => (
    <div {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#605F5F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-newspaper"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
    </div>
  ),
  google: (props : any) => (
    <Image
      {...props}
      src={google}
      alt="logo"
      width={26}
      height={30}
    />
  ),
  house: (props : any) => (
    <Image
      {...props}
      src='/icons/house.svg'
      alt="logo"
      width={23}
      height={36}
    />
  ),
  form: (props : any) => (
    <Image
      {...props}
      src='/icons/form.svg'
      alt="logo"
      width={23}
      height={36}
    />
  ),
  stats: (props : any) => (
    <Image
      {...props}
      src='/icons/stats-1.svg'
      alt="logo"
      width={23}
      height={36}
    />
  ),
};
