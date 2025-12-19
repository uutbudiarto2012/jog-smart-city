import MainFooter from "./footer/main-footer";
import MainNav from "./navbar/main-nav";

export default function WebisteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainNav />
      <main>
        {children}
      </main>
      <MainFooter />
    </>
  );
}
