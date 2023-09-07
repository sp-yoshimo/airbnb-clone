"use client";

import { useRouter } from "next/navigation";

import React, { useCallback, useState } from "react";
import { SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface TripsClientProps{
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const TripClient: React.FC<TripsClientProps> = ({
    currentUser,
    reservations
}) => {

    const router = useRouter();
    const [deleteingId, setDeletingId]=useState("");

    const onChancel = useCallback((id: string)=>{

        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("Reservation canceled")
            router.refresh();
        })
        .catch((error)=>{
            toast.error("Something went wrong");
        })
        .finally(()=>{
            setDeletingId("");
        })

    },[router])

    return(
        <Container>
            <Heading 
            title="Trips"
            subtitle="Where you've been and where you're going"
            />
            <div className="mt-10  gap-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
            2xl:grid-cols-6
            ">
                {reservations.map((reservation)=>(
                    <ListingCard
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onChancel}
                    disabled={deleteingId === reservation.id}
                    actionLabel="Cancel reservation"
                    currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
};

export default TripClient;
