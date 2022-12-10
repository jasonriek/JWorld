class JayMythos
{
    constructor()
    {
        
        this.play = false;
        this.pause_play_button = document.getElementById("pause_play");
        this.top_site_header = document.getElementById("event_test");

        this.music = {
            "Sense": new Audio("Audio/Music/sense_no_audio.mp3"),
            "The Living Sea": new Audio("Audio/Music/TheLivingSea.mp3"),
            "The Next Way": new Audio("Audio/Music/TheNextWay.mp3")
        }
        this.music_list = Object.keys(this.music);
        this.current_song = this.shuffle();
        this.current_song_file = this.music[this.current_song]
    }

    songIsInMusicList(song)
    {
        for(let song_index = 0; song_index < this.music.length; song_index++)
            if(song == this.music_list[song_index])
                return true;
        return false;
    }

    playSong(song)
    {
        if(this.songIsInMusicList(song))
            this.current_song = song;
        this.current_song_file = this.music[this.current_song]

        this.top_site_header.innerHTML = 'Now Playing '+this.current_song+' - JayMythos';
        this.changeToPauseButton();
        this.play = false;
        this.playPause(this.current_song)
    }

    playShuffle()
    {
            this.current_song = this.shuffle();
            this.current_song_file = this.music[this.current_song]
            this.top_site_header.innerHTML = 'Now Playing '+this.current_song+' - JayMythos';
            this.changeToPauseButton();
            this.play = false;
            this.playPause(this.current_song);
    }
    shuffle()
    {
        let shuffle = Math.floor(Math.random() * this.music_list.length);
        let song = this.music_list[shuffle];

        return song;
    }

    changeButtonIfMusicIsDonePlaying()
    {
        if(this.current_song_file.currentTime > 0)
            if(this.current_song_file.ended)
                this.changeToPlayButton();
    }

    getNextShuffle()
    {
        let last_song = this.current_song;
        while(this.current_song === last_song)
        {
            this.top_site_header.innerHTML = 'Shuffling...';
            this.current_song = this.shuffle()
        }
    }

    playNextShuffle()
    {
        // IF SHUFFLING -- for future use --
        if(this.current_song_file.currentTime > 0)
            if(this.current_song_file.ended)
            {
                this.getNextShuffle();
                this.changeToPauseButton();
                this.playSong(this.current_song)
            }
    }

    playPause(song)
    {
        this.play = !this.play;
        if(this.play)
        {
            this.changeToPauseButton();
            this.current_song_file.play();
        }
        else
        {
            this.changeToPlayButton();
            this.current_song_file.pause();
        }
    }
    changeToPauseButton()
    {
        
        this.pause_play_button.innerHTML = '<button id="play-pause-btn" class="icon" onclick="j_world.events.jaymythos.playPause();"><div class="pauseicon"></div></button>';
    }
    changeToPlayButton()
    {
        this.pause_play_button.innerHTML = '<button id="play-pause-btn" class="icon" onclick="j_world.events.jaymythos.playPause();"><div class="playicon"></div></button>';
    }
}

class Events
{
    constructor()
    {
        this.jaymythos = new JayMythos();
        this.music_played = false;
    }

    characterEvents(character)
    {
        switch(character)
        {
            case "AlanWatts":
                // Alan Watts
                if( (j_world.explorer.x_index >= 8 && j_world.explorer.x_index <= 20) && (j_world.explorer.y_index >= 8 && j_world.explorer.y_index <= 16))
                {
                    //j_world.alan_watts.move(j_world.tiles[6][2]);   
                    j_world.alan_watts.draw();
                }
            break;
        }
    }

    playMusic()
    {
        if(j_world.explorer.x_index == 17 && j_world.explorer.y_index == 17)
            if(!this.music_played)
            {
                this.jaymythos.playShuffle();
                this.music_played = true;
            }
        //this.jaymythos.changeButtonIfMusicIsDonePlaying();
        this.jaymythos.playNextShuffle();
                
    }
    
}


