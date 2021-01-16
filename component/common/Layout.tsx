import { NextSeo } from "next-seo";
import Menu from "./Menu";

interface LayoutProps {
  title: string;
  description: string;
  children: any;
}

export default function Layout({ title, description, children }: LayoutProps) {
  return (
    <>
      <NextSeo title={title} description={description} />
      <header>
        <Menu />
      </header>
      <main>{children}</main>
    </>
  );
}
