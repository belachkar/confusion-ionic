import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Leadership } from '../../objects/Leadership';
import { LeadershipService } from '../../services/leadership.services';

@Component({
	templateUrl: 'build/pages/about/about.html',
	providers: [LeadershipService],
})

export class AboutPage implements OnInit{
	
	leaderships : Leadership[];
	showLeaders = false;

	constructor(private navController: NavController, private leadershipService: LeadershipService) {
	}

	ngOnInit(){
    	this.leadershipService.getLeaderships().then(
    		leaderships => {
    			this.leaderships = leaderships;
    			this.showLeaders = true;
    		}
		);
	}
}
