import React from "react";

const cards = [
    {
        title: 'Deploy Your First Smart Contract on EDU Chain',
        image: "https://api.universalprofile.cloud/ipfs/QmNzhFeiYXRtAiczXg35EcUSvzeADKQgi4MgHfMzNHzu8c",
    },
    {
        title: 'Your Ape-proach to Web3 - Building on ApeChain',
        image: "https://api.universalprofile.cloud/ipfs/QmRzDLGzMLQ31LAArN1mhf2QaBeJcPdbJoVXZ9vQ1FkEdV",
    },
    {
        title: 'Stylish course to Stylus smart contract development',
        image: "https://api.universalprofile.cloud/ipfs/QmaQHLoWPcEPKk388VgmX4QCctKkdyGefcvnY6ydtx11yB",
    },
    {
        title: 'Victionary - Everything about Viction',
        image: "https://api.universalprofile.cloud/ipfs/QmbJAFHRPfF6fUc33abfccYAkdz3L8MLDtRNdgXvDUQQhp",
    },
];

const Cards = () => {
    const total = 4; // Total number of cards
    const rotationRange = 45; // Range for rotation
    const offsetRange = 15; // Range for translation offset

    const calculateTransform = (index: number) => {
        const midpoint = (total - 1) / 2; // Calculate the midpoint of the cards
        const rotation = ((index - midpoint) / (total - 2)) * rotationRange;
        const offset = Math.abs(((index - midpoint) / (total - 2)) * offsetRange);
        return `translateY(${offset}px) rotate(${rotation}deg)`;
    };

    return (
        <div className="cards">
            {cards.map((card, index) => (
                <div key={index} className="card">
                    <div className="card-face"
                        style={{
                            // background: `linear-gradient(-135deg, hsla(${(i / total) * -360}, 100%, 80%, 1), hsla(${(i / total) * -360}, 90%, 45%, 1))`,
                            // boxShadow: `
                            //           -5px 5px 5px hsla(0, 0%, 0%, 0.15),
                            //           inset 0 0 0 2px hsla(${(i / total) * -360}, 100%, 80%, 0.75)
                            //         `,
                            // transform: calculateTransform(i),
                            // overflow: 'hidden',
                        }}
                    >
                        <img src={card.image} alt={card.title} className="w-full h-auto transition-transform duration-1000 ease-in-out group-hover:scale-105" />
                        <div className="text-center font-semibold mt-2">{card.title}</div>
                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default Cards;