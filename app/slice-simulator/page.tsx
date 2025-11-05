import {
  SliceSimulator,
  SliceSimulatorParams,
  getSlices,
} from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices";

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const { state } = await searchParams;
  const slices = getSlices(state);

  // Filter out slices that don't have components registered
  const availableSliceTypes = Object.keys(components);
  const filteredSlices = slices?.filter((slice: any) =>
    availableSliceTypes.includes(slice.slice_type)
  ) || [];

  return (
    <SliceSimulator>
      <SliceZone slices={filteredSlices} components={components} />
    </SliceSimulator>
  );
}
