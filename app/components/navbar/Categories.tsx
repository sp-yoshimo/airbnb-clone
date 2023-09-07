"use client";

import React from "react";
import Container from "../Container";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import { 
    GiBoatFishing,
    GiIsland,
    GiWindmill,
    GiLockedFortress,
    GiForestCamp,
    GiCaveEntrance,
    GiCactus, 
    GiBarn } from "react-icons/gi"
import { FaSkiing } from "react-icons/fa"
import { IoDiamond } from "react-icons/io5"
import { BsSnow } from "react-icons/bs"
import { MdOutlineVilla } from "react-icons/md"
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "This property is close to the beach!"
    },
    {
        label: "WindMills",
        icon: GiWindmill,
        description: "This property has windMills!"
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "This property is modern"
    },
    {
        label: "Countryside",
        icon: TbMountain,
        description: "This property is CountrySide"
    },
    {
        label: "Pools",
        icon: TbPool,
        description: "This property has a Pool"
    },
    {
        label: "IsLands",
        icon: GiIsland,
        description: "This property is on an IsLands"
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "This property is close to Lake"
    },
    {
        label: "Sking",
        icon: FaSkiing,
        description: "This property is has skiing activities!"
    },
    {
        label: "Catsle",
        icon: GiLockedFortress,
        description: "This property is in a catsle"
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "This property has camping activities!"
    },
    {
        label: "Arctic",
        icon: BsSnow,
        description: "This property has arctic"
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "This property in a cave"
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "This property is in the cave"
    },
    {
        label: "Barns",
        icon: GiBarn,
        description: "This property is in the cave"
    },
    {
        label: "Lux",
        icon: IoDiamond,
        description: "This property is in the luxurious"
    },
]

const Categories = () => {

    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();

    const isMainPage = pathname === "/";

    if(!isMainPage){
        return null;
    }


    return (
        <Container>
            <div className="
            pt-4 flex flex-row items-center justify-between overflow-x-auto
            ">
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
