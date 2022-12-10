import React from "react";
import style from "./Ticket.module.scss";
import Image from "next/image";

interface propsTicket {
  price: number;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  stops: number;
  destination_name: string;
  destination: string;
  origin_name: string;
  origin: string;
}

export default function Ticket(props: propsTicket) {
  return (
    <div className={style.Ticket}>
      <header>
        <div>{props.price}Р</div>
        <Image
          src="/TicketLogo.svg"
          alt="Logo"
          className="Ticket__logo"
          width={110}
          height={36}
        />
      </header>
      <main>
        <div>
          <div className={style.Ticket__time}>{props.departure_time}</div>
          <div className={style.Ticket__place}>
            {props.destination}, {props.destination_name}
          </div>
          <div className={style.Ticket__data}>{props.departure_date}</div>
        </div>
        <div className={style.Ticket__stops}>{props.stops} пересадки</div>
        <div>
          <div className={style.Ticket__time}>{props.arrival_time}</div>
          <div className={style.Ticket__place}>
            {props.origin}, {props.origin_name}
          </div>
          <div className={style.Ticket__data}>{props.arrival_date}</div>
        </div>
      </main>
    </div>
  );
}
