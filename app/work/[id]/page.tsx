import DetailProjectBar from "@/components/organism/DetailProjectBar";
import ProfileBar from "@/components/organism/ProfileBar";
import satellite from "@/services/satellite";
import { Metadata } from "next";
import React from "react";
import { PulseLoader } from "react-spinners";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const data = await getDetailProject(id);

  return {
    title: data.title,
    description: data.description,
  };
}

async function getDetailProject(id: string) {
  const response = await satellite.get(`/projects/${id}`);
  return response.data.data;
}

const DetailWorkPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const data = await getDetailProject(id);

  if (!data) return <PulseLoader />;

  return (
    <>
      <main className="max-lg:hidden flex gap-5 p-10 bg-stone-200 min-h-screen">
        <ProfileBar />
        <DetailProjectBar data={data} />
      </main>
      <main className="p-5 min-h-screen bg-stone-200 lg:hidden">
        <DetailProjectBar data={data} />
      </main>
    </>
  );
};

export default DetailWorkPage;
