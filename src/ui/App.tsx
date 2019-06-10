import React from 'react';
import { isMobile } from 'react-device-detect';
import TimelineCanvas from './TimelineCanvas';
import TimelineSummary from './TimelineSummary';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './App.module.scss';

export default class App extends React.Component<AppProps, AppState> {
	public constructor(props: AppProps) {
		super(props);

		this.state = {
			selectedEventIndex: 0
		};
	}

	private onChangeSelectedEvent = (event: number) => {
		this.setState({
			selectedEventIndex: event
		});
	}

	public render() {
		if(isMobile) {
			return (
				<div className={styles.mobileError}>
					Unfortunately this website isn't mobile compatible yet. <br />
					Please use a desktop browser instead.
				</div>
			);
		}

		const timelineProps = {
			selectedEventIndex: this.state.selectedEventIndex,
			onChangeSelectedEvent: this.onChangeSelectedEvent
		};

		return (
			<div className={styles.app}>
				<Container className={styles.container}>
					<Row>
						<Col md={9}>
							<TimelineCanvas {...timelineProps} />
						</Col>
						<Col md={3} className={styles.timelineSummary}>
							<TimelineSummary {...timelineProps} />
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export interface AppProps {}

export interface AppState {
	selectedEventIndex: number;
}