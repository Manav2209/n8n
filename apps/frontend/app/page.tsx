import Link from "next/link";

export default function Home() {

  const links = [
    {
    title:"Dashboard",
    href:"/dashboard"
    },
    {
    title:"Login",
    href:"/signin"
    },
    {
    title:"Executions",
    href:"/executions"
    },
]
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="font-bold text-2xl">Welcome to n8n! Trading Platform</div>
      <div className="flex p-4 mx-auto gap-4">
        {links.map((link) => (
              <div key={link.href} className="flex flex-col">
                <Link className="font-bold text-xl " href={link.href}>{link.title}</Link>
                <div className="w-full h-[2] bg-black"></div>
              </div>
        ))}
      </div>
    </div>
  );
}