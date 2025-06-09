import { useState } from "react";

function Books() {
    const [books, setBooks] = useState(["The Great Gatsby", "War and Peace", "Hamlet", "Moby Dick", "Harry Potter", "Frankenstein"]);

    const reset = () => {
        setBooks(["The Great Gatsby", "War and Peace", "Hamlet", "Moby Dick", "Harry Potter", "Frankenstein"]);
    }
    const sorteeriAZ = () => {
        books.sort((a,b) => a.localeCompare(b));
        setBooks(books.slice());
    }

    const sorteeriZA = () => {
        books.sort((a,b) => b.localeCompare(a));
        setBooks(books.slice());
    }

    const sorteeriTahedKasv = () => {
        books.sort((a,b) => a.length - b.length);
        setBooks(books.slice());
    }

    const sorteeriSonad = () => {
        const sortedBooks = [...books].sort((a, b) => {
        const sõnadeArv = str => str.trim().split(" ").filter(Boolean).length;
        return sõnadeArv(a) - sõnadeArv(b); // kasvavalt
        });

        setBooks(sortedBooks);
    }

    // const sorteeriEelviimaneTaht = () => {
    //     books.sort((a,b) => a[b.length-2].localeCompare(b[b.length-2]));
    //     setBooks(books.slice());
    // }

    const sorteeriTeineTahtAZ = () => {
        books.sort((a,b) => a[1].localeCompare(b[1]));
        setBooks(books.slice());
    }

    const filtreeriThegaAlgavad = () => {
        const vastus = books.filter(raamat => raamat.startsWith("The"));
        setBooks(vastus);
    }

    const filtreeri10Tahelised = () => {
        const vastus = books.filter(raamat => raamat.length >= 10);
        setBooks(vastus);
    }

    const filtreeriVahemKui7 = () => {
        const vastus = books.filter(raamat => raamat.length <= 7);
        setBooks(vastus);
    }

    const filtreeriKllelLyhendAnd = () => {
        const vastus = books.filter(raamat => raamat.includes("and"));
        setBooks(vastus);
    }

    const filtreeriKellelEelviimaneTahtC = () => {
        const vastus = books.filter(raamat => raamat[raamat.length - 2] === "c");
        setBooks(vastus);
    }

    const filtreeriKellel3RohkemSona = () => {
        const vastus = books.filter(raamat => raamat.split(" ").length >= 3);
        setBooks(vastus);
    }

  return (
    <div>
        <button onClick={reset}>Reset</button>
        <br />
        <button onClick={sorteeriAZ}>Sorteeri A-Z</button>
        <button onClick={sorteeriZA}>Sorteeri Z-A</button>
        <button onClick={sorteeriTahedKasv}>Sorteeri tähemärgid kasvavalt</button>
        <button onClick={sorteeriSonad}>Sorteeri sõnade arvu järgi</button>
        {/* <button onClick={sorteeriEelviimaneTaht}>Sorteeri eelviimase tähe järgi</button> */}
        <button onClick={sorteeriTeineTahtAZ}>Sorteeri A-Z teine täht</button>
        <br /><br />
        <button onClick={filtreeriThegaAlgavad}>Jäta alles The-ga algavad</button>
        <button onClick={filtreeri10Tahelised}>Jäta alles 10 tähelised või suuremad</button>
        <button onClick={filtreeriVahemKui7}>Jäta 7 või vähem tähelised raamatud</button>
        <button onClick={filtreeriKllelLyhendAnd}>Jäta alles kellel lühend and</button>
        <button onClick={filtreeriKellelEelviimaneTahtC}>Jäta alles kellel eelviimane täht C</button>
        <button onClick={filtreeriKellel3RohkemSona}>Jäta alles kellel 3 või rohkem sõna</button>
        {books.map(element => <div key={element}>{element}</div>)}
    </div>
  )
}

export default Books