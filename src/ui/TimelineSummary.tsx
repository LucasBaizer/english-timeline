import React from 'react';
import TimelineModel, { TimelineItem, TimelineUtil } from '../model/TimelineModel';
import { ListGroup, Card } from 'react-bootstrap';
import AudioPlayer from './AudioPlayer';
import styles from './TimelineSummary.module.scss';

export default class TimelineCanvas extends React.Component<TimelineModelProps, TimelineModelState> {
	public constructor(props: TimelineModelProps) {
		super(props);

		this.state = {};
	}

	private onClickTimelineItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const target: HTMLAnchorElement = e.target as HTMLAnchorElement;
		const index: number = parseInt(target.getAttribute('data-index') as string, 10);

		if (index !== this.props.selectedEventIndex) {
			this.props.onChangeSelectedEvent(index);
		}
	};

	public render() {
		const currentItem: TimelineItem = TimelineModel[this.props.selectedEventIndex];

		return (
			<div>
				<div className={styles.timelineWindow}>
					<ListGroup>
						{TimelineModel.map((item, index) => (
							<ListGroup.Item
								className={styles.timelineItem}
								onClick={this.onClickTimelineItem}
								active={this.props.selectedEventIndex === index}
								data-index={index.toString()}
								key={index}>
								{item.title}
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
				<div>
					<Card className={styles.rigidCard}>
						<Card.Img variant="top" src={currentItem.imageFile} />
						<Card.Body>
							<Card.Title>
								{currentItem.title}
								<AudioPlayer
									audioFile={currentItem.audioFile} />
							</Card.Title>
							<Card.Text>
								<b>{TimelineUtil.toReadableTime(currentItem.time)} </b>
								{currentItem.description}
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			</div>
		);
	}
}

export interface TimelineModelProps {
	selectedEventIndex: number;
	onChangeSelectedEvent: (event: number) => void;
}

export interface TimelineModelState { }