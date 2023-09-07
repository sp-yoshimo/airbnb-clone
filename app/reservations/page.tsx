

import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationClient from "./ReservationClient";

const Reservationspage = async() =>{

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                title="Unauthrized"
                subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    })

    if(reservations.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations on your propaties"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <ReservationClient
            reservations={reservations}
            currentUser={currentUser}
            />
        </ClientOnly>
    )

};

export default Reservationspage;