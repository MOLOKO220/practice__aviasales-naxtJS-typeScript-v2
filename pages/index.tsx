import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Ticket from "../component/Ticket/Ticket";

export default function index() {
  // hooks
  const [renderTickets, setRenderTickets] = useState<any[]>([]);
  // пакет билетов
  const dataBurst = useRef<any[]>([]);
  // фильтрация пересадок
  const transferIndicator = useRef({
    all: false,
    zero: false,
    one: false,
    second: false,
    thirde: false,
  });

  useEffect(() => {
    // получаем пакет билетов
    fetch("http://localhost:3000/api/tickets")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // записываем все билеты в отдельный массив
        dataBurst.current = data.tickets;
      })
      .then(() => {
        // рендарим первые 5 билетов
        setRenderTickets(
          dataBurst.current.filter((e, i) => {
            if (i < 5) {
              return e;
            }
          })
        );
      });
  }, []);

  function filterStops(el: any) {
    // изменяем индикаторы, если индикатор true, пушим нужные билеты
    if (el.target.dataset.stop === "all") {
      transferIndicator.current.all = !transferIndicator.current.all;
    } else if (el.target.dataset.stop === "0") {
      transferIndicator.current.zero = !transferIndicator.current.zero;
    } else if (el.target.dataset.stop === "1") {
      transferIndicator.current.one = !transferIndicator.current.one;
    } else if (el.target.dataset.stop === "2") {
      transferIndicator.current.second = !transferIndicator.current.second;
    } else if (el.target.dataset.stop === "3") {
      transferIndicator.current.thirde = !transferIndicator.current.thirde;
    }

    // проверяем какие индикаторы true
    if (transferIndicator.current.all) {
      // все билеты
      setRenderTickets(dataBurst.current);
    } else {
      if (
        transferIndicator.current.zero ||
        transferIndicator.current.one ||
        transferIndicator.current.second ||
        transferIndicator.current.thirde
      ) {
        // фильтруем нужные билеты
        const tikets = dataBurst.current.filter((el) => {
          if (transferIndicator.current.zero && el.stops == 0) {
            return el;
          } else if (transferIndicator.current.one && el.stops == 1) {
            return el;
          } else if (transferIndicator.current.second && el.stops == 2) {
            return el;
          } else if (transferIndicator.current.thirde && el.stops == 3) {
            return el;
          }
        });
        setRenderTickets(tikets);
      }
    }
  }

  function showMore() {
    // показать ещё 5 билетов
    setRenderTickets([
      ...renderTickets,
      ...dataBurst.current.filter((e, i) => {
        if (i >= renderTickets.length) {
          return e;
        }
      }),
    ]);
  }

  //самый дешевый
  function cheapest() {
    let c = [...renderTickets];
    c.sort(function (a, b) {
      return b.price - a.price;
    });
    setRenderTickets(c);
  }

  return (
    <section className="aviasales">
      <Image
        src="/Logo.svg"
        alt="Logo"
        className="aviasales__logo"
        width={60}
        height={60}
      />
      <section className="aviasales__section">
        <ul className="aviasales__section__transplant-filter">
          <h5>Количество пересадок</h5>
          <li>
            <label>
              <input type="checkbox" data-stop="all" onChange={filterStops} />
              <span>Все</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" data-stop="0" onChange={filterStops} />
              <span>Без пересадок</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" data-stop="1" onChange={filterStops} />
              <span>1 пересадка</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" data-stop="2" onChange={filterStops} />
              <span>2 пересадки</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" data-stop="3" onChange={filterStops} />
              <span>3 пересадки</span>
            </label>
          </li>
          <div onClick={cheapest}>Самый дешевый</div>
        </ul>
        <main className="aviasales__section__main">
          {renderTickets.length != 0
            ? renderTickets.map((el) => {
                return (
                  <Ticket
                    key={el.id}
                    price={el.price}
                    departure_date={el.departure_date}
                    departure_time={el.departure_time}
                    arrival_date={el.arrival_date}
                    arrival_time={el.arrival_time}
                    stops={el.stops}
                    destination_name={el.destination_name}
                    destination={el.destination}
                    origin_name={el.origin_name}
                    origin={el.origin}
                  />
                );
              })
            : "Ожедание..."}
          <button onClick={showMore}>Показать еще 5 билетов!</button>
        </main>
      </section>
    </section>
  );
}
