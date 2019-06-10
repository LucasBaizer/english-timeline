import React from 'react';
import TimelineModel, { TimelineItem, TimelineUtil } from '../model/TimelineModel';
import styles from './TimelineCanvas.module.scss';

export default class TimelineCanvas extends React.Component<TimelineCanvasProps, TimelineCanvasState> {
	private canvas: HTMLCanvasElement | null = null;

	public constructor(props: TimelineCanvasProps) {
		super(props);

		this.state = {
			indexStart: 0,
			indexEnd: 2,
			setSize: false,
			circles: []
		};
	}

	componentDidUpdate(prevProps: TimelineCanvasProps) {
		if (prevProps.selectedEventIndex !== this.props.selectedEventIndex) {
			if (this.props.selectedEventIndex >= this.state.indexEnd && this.state.indexEnd !== TimelineModel.length - 1) {
				const difference = this.props.selectedEventIndex - this.state.indexEnd + 1;
				this.setState({
					indexStart: Math.min(this.state.indexStart + difference, TimelineModel.length - 3),
					indexEnd: Math.min(this.state.indexEnd + difference, TimelineModel.length - 1)
				});
			} else if (this.props.selectedEventIndex <= this.state.indexStart && this.state.indexStart !== 0) {
				const difference = this.state.indexStart - this.props.selectedEventIndex + 1;
				this.setState({
					indexStart: Math.max(this.state.indexStart - difference, 0),
					indexEnd: Math.max(this.state.indexEnd - difference, 2)
				});
			}
		}
	}

	private redraw() {
		if (this.canvas !== null) {
			this.state.circles.splice(0, this.state.circles.length); // remove all elements

			if (!this.state.setSize) {
				this.canvas.width = this.canvas.clientWidth;
				this.canvas.height = this.canvas.clientHeight;
				this.setState({
					setSize: true
				});
				return;
			}
			const width = this.canvas.width;
			const height = this.canvas.height;

			const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;
			ctx.clearRect(0, 0, width, height);

			ctx.fillStyle = '#000000';

			ctx.fillRect(15, height / 2 - 10, width - 30, 20);

			ctx.beginPath();
			ctx.arc(15, height / 2, 10, 0, 2 * Math.PI);
			ctx.arc(width - 15, height / 2, 10, 0, 2 * Math.PI);
			ctx.fill();

			for (const indexString in TimelineModel) {
				const index = parseInt(indexString, 10);
				if (TimelineModel.hasOwnProperty(indexString)) {
					const item: TimelineItem = TimelineModel[indexString];
					const startItem: TimelineItem = TimelineModel[this.state.indexStart];
					const endItem: TimelineItem = TimelineModel[this.state.indexEnd];
					if (item.time >= startItem.time && item.time <= endItem.time) {
						const timeAfterStart = item.time.getTime() - startItem.time.getTime();
						const totalTimeElapsed = endItem.time.getTime() - startItem.time.getTime();
						const ratio = timeAfterStart / totalTimeElapsed;

						const centerX = ratio * (width - 200) + 100;
						const sideMultiplier = index % 2 === 0 ? 1 : -1;

						ctx.fillStyle = '#000000';
						ctx.fillRect(centerX - 6, height / 2, 12, 100 * sideMultiplier);

						ctx.lineWidth = 8;
						ctx.beginPath();
						ctx.arc(centerX, height / 2 + (116 * sideMultiplier), 16, 0, 2 * Math.PI);
						if (index === this.props.selectedEventIndex) {
							ctx.fillStyle = '#007BFF';
						} else {
							ctx.fillStyle = '#FFFFFF';
						}
						ctx.fill();
						ctx.stroke();

						this.state.circles.push({
							x: centerX,
							y: height / 2 + (116 * sideMultiplier),
							radius: 16,
							index: index,
							isTop: sideMultiplier > 0
						});
					}
				}
			}

			ctx.fillStyle = '#787878';
			let lastCircle: TimelineCircle | null = null;
			for(const circle of this.state.circles) {
				if(lastCircle === null || circle.x - lastCircle.x >= 50) {
					const item = TimelineModel[circle.index];
					const timeText = TimelineUtil.toReadableTime(item.time);
					ctx.font = '18px Arial';
					ctx.textBaseline = 'middle';
					ctx.fillText(timeText, circle.x - ctx.measureText(timeText).width / 2, height / 2 + (25 * (circle.isTop ? -1 : 1)));
					lastCircle = circle;
				}
			}
		}
	}

	private circleIntersects(event: { x: number, y: number }, circle: TimelineCircle): boolean {
		return Math.sqrt((event.x - circle.x) ** 2 + (event.y - circle.y) ** 2) < circle.radius;
	}

	private getCurrentCircle(e: React.MouseEvent<HTMLCanvasElement>): TimelineCircle | null {
		if (this.canvas !== null) {
			const box = this.canvas.getBoundingClientRect();
			const point = {
				x: e.clientX - box.left,
				y: e.clientY - box.top
			};
			for (const circle of this.state.circles) {
				if (this.circleIntersects(point, circle)) {
					return circle;
				}
			}
		}
		return null;
	}

	onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (this.canvas !== null) {
			if (this.getCurrentCircle(e) !== null) {
				this.canvas.style.cursor = 'pointer';
			} else {
				this.canvas.style.cursor = 'auto';
			}
		}
	}

	onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (this.canvas !== null) {
			const circle = this.getCurrentCircle(e);
			if (circle !== null && circle.index !== this.props.selectedEventIndex) {
				this.props.onChangeSelectedEvent(circle.index);
			}
		}
	}

	public render() {
		return (
			<canvas
				className={styles.canvas}
				ref={canvas => {
					this.canvas = canvas;
					this.redraw();
				}}
				onMouseMove={this.onMouseMove}
				onClick={this.onClick} />
		);
	}
}

export interface TimelineCanvasProps {
	selectedEventIndex: number;
	onChangeSelectedEvent: (event: number) => void;
}

export interface TimelineCanvasState {
	indexStart: number;
	indexEnd: number;
	setSize: boolean;
	circles: TimelineCircle[];
}

export interface TimelineCircle {
	x: number;
	y: number;
	radius: number;
	index: number;
	isTop: boolean;
}