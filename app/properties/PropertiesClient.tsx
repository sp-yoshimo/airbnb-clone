"use client";

import { useRouter } from "next/navigation";

import React, { useCallback, useState } from "react";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface PropertiesClientProps{
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    currentUser,
    listings
}) => {

    const router = useRouter();
    const [deleteingId, setDeletingId]=useState("");

    const onChancel = useCallback((id: string)=>{

        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success("Listing deleted")
            router.refresh();
        })
        .catch((error)=>{
            toast.error("Some thing went wrong");
        })
        .finally(()=>{
            setDeletingId("");
        })

    },[router])

    return(
        <Container>
            <Heading 
            title="Properties"
            subtitle="List of your properties"
            />
            <div className="mt-10  gap-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
            2xl:grid-cols-6
            ">
                {listings.map((listing)=>(
                    <ListingCard
                    key={listing.id}
                    data={listing}
                    actionId={listing.id}
                    onAction={onChancel}
                    disabled={deleteingId === listing.id}
                    actionLabel="Delete property"
                    currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
};

export default PropertiesClient;
