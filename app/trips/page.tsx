

import React from "react";

import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripClient from "./TripClient";

const TripPage = async() => {

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState 
                title="Unauthorized"
                subtitle="Plese login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    })

    if(reservations.length === 0){
        return(
            <ClientOnly>
                <EmptyState 
                title="No trips found"
                subtitle="Looks like you havent reserved any trips"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <TripClient
            reservations={reservations}
            currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripPage;