import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import BarbershopInfo from "../components/barbershop-info";
import ServiceItem from "../components/service-item";

interface BarbershopDetailsPagePros {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPagePros) => {
  if (!params.id) {
    //redirecionar para home page
    return null;
  }
  const barbershop = await db.barberShop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      Service: true,
    },
  });

  if (!barbershop) {
    //redirecionar para home page
    return null;
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />
      <div className="px-5 gap-3 flex flex-col py-6">
        {barbershop.Service.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
