import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import styles from './AudioPlayer.module.scss';

export default class AudioPlayer extends React.Component<AudioPlayerProps, AudioPlayerState> {
	public constructor(props: AudioPlayerProps) {
		super(props);

		const audio = new Audio('/audio/' + this.props.audioFile + '.mp3');
		audio.load();

		this.state = {
			playing: false,
			audio: audio
		};
	}

	componentDidUpdate(prevProps: AudioPlayerProps) {
		if(prevProps.audioFile !== this.props.audioFile) {
			this.state.audio.pause();
			this.state.audio.currentTime = 0;

			const audio = new Audio('/audio/' + this.props.audioFile + '.mp3');
			audio.load();

			this.setState({
				audio: audio,
				playing: false
			});
		}
	}

	private onClickPlay = () => {
		if (!this.state.playing) {
			this.state.audio.play();
			this.state.audio.onended = () => {
				this.state.audio.pause();
				this.state.audio.currentTime = 0;

				this.setState({
					playing: false
				});
			};
		} else {
			this.state.audio.pause();
			this.state.audio.currentTime = 0;
		}

		this.setState({
			playing: !this.state.playing
		});
	};

	public render() {
		return (
			<span onClick={this.onClickPlay} className={styles.audioSpan}>
				<FontAwesomeIcon icon={this.state.playing ? faVolumeUp : faPlayCircle} className={styles.audioIcon} />
			</span>
		);
	}
}

export interface AudioPlayerProps {
	audioFile: string;
}

export interface AudioPlayerState {
	playing: boolean;
	audio: HTMLAudioElement;
}