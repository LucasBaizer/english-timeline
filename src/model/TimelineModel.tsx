export interface TimelineItem {
	title: string,
	description: string,
	audioFile: string,
	imageFile: string,
	time: Date
}

const Model: TimelineItem[] = [
	{
		title: 'Start of the Day',
		description: 'My dad got into work in the morning, just minutes before the North Tower was hit. He was working in New York, as he did one out of every six weeks.',
		audioFile: 'question-2-answer',
		imageFile: 'https://amp.businessinsider.com/images/55f3279fbd86ef13008b9cbd-1334-1001.jpg',
		time: new Date('11 Sep 2001 08:40:00')
	},
	{
		title: 'North Tower Hit',
		description: 'The first plane collided with the North Tower, and everyone in my father\'s office was watching the news, believing it was a horrific accident.',
		audioFile: 'question-3-answer',
		imageFile: 'https://live.staticflickr.com/6201/6098313422_796b084ceb_z.jpg',
		time: new Date('11 Sep 2001 08:46:00')
	},
	{
		title: 'South Tower Hit',
		description: 'Another plane crashed into the South Tower, and it was at this point everyone knew that our nation was under sttack.',
		audioFile: 'question-9-answer',
		imageFile: 'http://911research.wtc7.net/~nin11evi/911research/wtc/evidence/photos/docs/st_hit2987.jpg',
		time: new Date('11 Sep 2001 09:03:00')
	},
	{
		title: 'Pentagon Hit',
		description: 'Yet another plane crashed into the western side on the Pentagon building in Washington, D.C.',
		audioFile: 'question-13-answer',
		imageFile: 'https://www.foreignpolicyjournal.com/wp-content/uploads/2016/10/pentagon-911-1024x640.jpg',
		time: new Date('11 Sep 2001 09:37:00')
	},
	{
		title: 'Dad Stays In New York',
		description: 'Due to there being almost zero traffic in and out of Manhattan because of high security measures, my dad ended up staying in New York for a few days.',
		audioFile: 'question-16-answer',
		imageFile: 'http://i2.cdn.turner.com/cnn/dam/assets/121107072900-holland-tunnel-story-top.jpg',
		time: new Date('11 Sep 2001 21:00:00')
	},
	{
		title: 'Dad Starts Driving Home',
		description: 'After staying in New York for a few nights, my dad got a rental car and started to head west.',
		audioFile: 'question-16-answer',
		imageFile: 'https://media.breitbart.com/media/2016/09/AP01091105565.jpg',
		time: new Date('14 Sep 2001')
	},
	{
		title: 'Dad\'s Trip Home',
		description: 'After driving for two days, across the country, my dad caught a flight out of Denver into San Diego.',
		audioFile: 'question-17-answer',
		imageFile: 'https://media.graytvinc.com/images/810*455/dia18.jpg',
		time: new Date('16 Sep 2001')
	},
	{
		title: 'Assassination of Osama bin Laden',
		description: 'Osama bin Laden, the mastermind behind the attacks on 9/11, was killed by the US Navy SEALs.',
		audioFile: 'question-24-answer',
		imageFile: 'https://www.latimes.com/resizer/YpRd4oj3riUZ2qrNJGYxG4GPIgo=/800x0/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/FQ6KSXZU5ZFBLMMAGMH657RRWE.jpg',
		time: new Date('02 May 2011')
	},
	{
		title: '18 Years Later',
		description: 'Even after all the time that was occurred since the events on 9/11/01, my dad is still not quite comfortable taking flights, and is very emotional when speaking about his experiences that day.',
		audioFile: 'question-26-answer',
		imageFile: 'https://www.telegraph.co.uk/content/dam/Travel/2018/January/white-plane-sky.jpg?imwidth=1400',
		time: new Date('9 Jun 2019')
	}
];

export default Model;

export class TimelineUtil {
	public static toReadableTime(time: Date) {
		if(time.getFullYear() === 2001 && time.getMonth() + 1 === 9 && time.getDate() === 11) {
			console.log(time);
			return '9/11/01 ' + time.getHours().toString() + ':' + time.getMinutes().toString().padStart(2, '0') + ' ' + (time.getHours() >= 12 ? 'PM' : 'AM');
		}
		return (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getFullYear();
	}
}