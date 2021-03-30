import * as assert from 'assert';
import * as vscode from 'vscode';
import { Timer } from '../../timer';
import {TrackPlayer, Track} from "../../trackplayer";
import {SoundCloudRequest} from "../../soundcloud_request";

const testNames = ["timer_tick", "track_queue", "query_track", "get_track_from_query",
"playpause_with_no_track"];

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('timer_tick', () => {
		const time = new Timer();
		let result = time.tick().time1;
		let start = new Date().getTime();
		let time2 = (new Date().getTime() - start);
		
		assert.equal(result,time2);
		assert.equal(0, 1);

	});

	test("track_queue", () => {
		let myTrackPlayer = new TrackPlayer;
		let track1 = new Track("Track 1", "Alina");
		let track2 = new Track("Track 2", "Owen");
		let track3 = new Track("Track 3", "Roniel");
		let track4 = new Track("Track 4", "Michael");
		myTrackPlayer.addToQueue(track1);
		myTrackPlayer.addToQueue(track2);
		myTrackPlayer.addToQueue(track3);
		myTrackPlayer.addToQueue(track4);

		assert.equal(myTrackPlayer.getQueue()[0].title, track1.title);
		assert.equal(myTrackPlayer.getQueue()[0].artist, track1.artist);
		myTrackPlayer.removeFromQueue(0);
		assert.equal(myTrackPlayer.getQueue()[0].title, track2.title);
		assert.equal(myTrackPlayer.getQueue()[0].artist, track2.artist);
		myTrackPlayer.removeFromQueue(0);
		assert.equal(myTrackPlayer.getQueue()[0].title, track3.title);
		assert.equal(myTrackPlayer.getQueue()[0].artist, track3.artist);
		myTrackPlayer.removeFromQueue(0);
		assert.equal(myTrackPlayer.getQueue()[0].title, track4.title);
		assert.equal(myTrackPlayer.getQueue()[0].artist, track4.artist);
	});

	test("query_track", () => {
		let myTrackPlayer = new TrackPlayer;
		const mySearchTerm = "circles";

		// We should get back something by searching "circles"
		SoundCloudRequest.queryTrack(mySearchTerm, (result: string[])=> {
			assert.notStrictEqual(result.length, 0);
		});
	});

	test("get_track_from_query", () => {
		let myTrackPlayer = new TrackPlayer;
		const mySearchTerm = "Circles Post Malone";

		SoundCloudRequest.getTrackFromQuery(mySearchTerm, (tracks: Array<Track>)=>{
			myTrackPlayer.pause();
			assert.notStrictEqual(tracks.length, 0);
		});

		assert.equal(0, 1);
	});

	test("playpause_with_no_track", () => {
		let myTrackPlayer = new TrackPlayer;
		myTrackPlayer.play();
		assert.equal(myTrackPlayer.isPaused, true);
		myTrackPlayer.pause();
		assert.equal(myTrackPlayer.isPaused, true);
	});
});
