import { useState, useMemo } from "react";
import { usePackages } from "../data/usePackages";
import PackageCard from "../components/PackageCard";
import CategoryFilter from "../components/CategoryFilter";

export default function Catalog() {


  return (
    <>
      <CategoryFilter />
    </>
  );
}
