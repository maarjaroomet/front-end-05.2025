import { useState } from "react";

function Numbers() {
    const [numbers, setNumbers] = useState([4, 23, 7, 39, 19, 0, 9, 14, 135, 34, 5]);

    const reset = () => {
        setNumbers([4, 23, 7, 39, 19, 0, 9, 14, 135, 34, 5]);
    }
    const sorteeriKasvavalt = () => {
        numbers.sort((a,b) => a - b);
        setNumbers(numbers.slice());
    }

    const sorteeriKahanevalt = () => {
        numbers.sort((a,b) => b - a);
        setNumbers(numbers.slice());
    }

    const sorteeriEsimeneNumberKasvavalt = () => {
        numbers.sort((a,b) => a.toString().localeCompare(b.toString()))
        setNumbers(numbers.slice());
    }

    const sorteeriEsimeneNumberKahanevalt = () => {
        numbers.sort((a,b) => b.toString().localeCompare(a.toString()))
        setNumbers(numbers.slice());
    }

    const filtreeriSuuremadKui8 = () => {
        const vastus = numbers.filter(number => number >= 8);
        setNumbers(vastus);
    }

    const filtreeriVaiksemadKui10 = () => {
        const vastus = numbers.filter(number => number <= 10);
        setNumbers(vastus);
    }

    const filtreeriPaarisarvud = () => {
        const vastus = numbers.filter(number => number%2 === 0);
        setNumbers(vastus);
    }

    const filtreeriPaaritudArvud = () => {
        const vastus = numbers.filter(number => number%2 !== 0);
        setNumbers(vastus);
    }

    const filtreeriNumbridAlgavad1 = () => {
        const vastus = numbers.filter(number => number.toString().startsWith("1"));
        setNumbers(vastus);
    }

    const filtreeriNumbridSisaldavad1 = () => {
        const vastus = numbers.filter(number => number.toString().includes("3"));
        setNumbers(vastus);
    }

  return (
    <div>
        <button onClick={reset}>Reset</button>
        <br />
        <button onClick={sorteeriKasvavalt}>Sorteeri numbri suuruse järgi kasvavalt</button>
        <button onClick={sorteeriKahanevalt}>Sorteeri numbri suuruse järgi kahavnevalt</button>
        <button onClick={sorteeriEsimeneNumberKasvavalt}>Sorteeri esimese numrbi järgi kasvavalt 0, 135, 14, 19 jne</button>
        <button onClick={sorteeriEsimeneNumberKahanevalt}>Sorteeri esimese numrbi järgi kahanevalt</button>
        <br /><br />
        <button onClick={filtreeriSuuremadKui8}>Jäta alles 8 või suuremad</button>
        <button onClick={filtreeriVaiksemadKui10}>Jäta 10 või väiksemad</button>
        <button onClick={filtreeriPaarisarvud}>Jäta alles paarisarvud</button>
        <button onClick={filtreeriPaaritudArvud}>Jäta alles paaritud arvud</button>
        <button onClick={filtreeriNumbridAlgavad1}>Jäta alles numbrid, mis algavad 1</button>
        <button onClick={filtreeriNumbridSisaldavad1}>Jäta alles numbrid, mis sisaldavad 3</button>
        {numbers.map(element => <div key={element}>{element}</div>)}
    </div>
  )
}

export default Numbers