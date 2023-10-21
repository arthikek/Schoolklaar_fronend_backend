import Image from 'next/image';


export const Images =  {
    logo: (props: any) => (
      <Image
      src={`/Schoolklaar.png`} //add image path here
      alt="logo"
      width={40}
      height={300}
      lazy = 'true'
      {...props}
      />
    ),
    school_logo: (props: any) => (
      <Image
      src={`/school-logo.jpg`} //add image path here
      alt="logo"
      width={40}
      height={300}
      lazy = 'true'
      {...props}
      />
    ),
    bottom: (props: any) => (
      <Image
        {...props}
        src={`/svg/bottom-shape.svg`} //add image path here
        alt="logo"
        lazy = 'true'
        width={380}
        height={600}
      />
    ),
    profile: (props: any) => (
      <Image
        {...props}
        src={`/images/profile-sk.png`} //add image path here
        alt="logo"
        lazy = 'true'
        width={70}
        height={600}
      />
    ),
};
