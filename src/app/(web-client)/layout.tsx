import MainFooter from "@/components/footer/main-footer";
import MainNav from "@/components/navbar/main-nav";


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
