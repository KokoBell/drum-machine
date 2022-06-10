const audio_library = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ]

function App() {

    const [volume, setVolume] = React.useState(1)

    return (
        <div id="drum-machine">
            <div className="text-center">
                <h2> Drum Machine </h2>
                <div id="display">
                    <p>
                        Press a Key!
                    </p>
                </div>
                {audio_library.map(clip => (
                    <Pad key={clip.id} clip={clip} volume={volume}/>
                ))}

                <br/>

                <input type="range" step="0.01" onChange={(event) => setVolume(event.target.value)} volume={volume} max="1" min="0" className="w-40" />
            </div>
        </div>
    )
}

function Pad({clip, volume}) {

    const [active, setActive] = React.useState(false)

    React.useEffect(() => {
        document.addEventListener("keydown", play_key)
        return () => document.removeEventListener("keydown", play_key)
    })

    const play_key = (event) => {
        if (event.keyCode === clip.keyCode) {
            lets_play()
        }
    }

    const lets_play = () => {

        const audio = document.getElementById(clip.keyTrigger)
        audio.currentTime = 0
        setActive(true)
        setTimeout(() => setActive(false), 200)
        let display = document.getElementById("display")
        display.innerHTML = clip.keyTrigger
        audio.volume = volume
        audio.play()
    }

    return (
        <div onClick={lets_play} className={`drum-pad btn btn-secondary p-4 m-1 ${active && "btn-warning"}`} id={clip.id}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url}/>
            {clip.keyTrigger}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))

