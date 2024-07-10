import Header from "@/components/header";
import { db } from "@/lib/prisma";
import BarbershopItem from "../(home)/components/barbershop-item";
import { redirect } from "next/navigation";
import Search from "../(home)/components/search";

interface BarbershopsPagePros {
  searchParams: {
    search?: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPagePros) => {
  if (!searchParams.search) {
    redirect("/");
  }
  const barbershops = await db.barberShop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });
  return (
    <>
      <Header />

      <div className="px-5 py-6 space-y-6">
        <Search
          defaultValues={{
            search: searchParams.search,
          }}
        />
        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>

        <div className="grid grid-cols-2 mt-3 gap-4">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BarbershopsPage;
