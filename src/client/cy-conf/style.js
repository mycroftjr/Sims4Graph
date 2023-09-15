export default `
core {
	active-bg-color: #fff;
	active-bg-opacity: 0.333;
}

.faded {
	events: no;
}

edge {
	curve-style: haystack;
	haystack-radius: 0;
	opacity: 0.333;
	width: 2;
	z-index: 0;
	overlay-opacity: 0;
	events: no;
	line-color: #DE3128;
}

edge.highlighted {
	opacity: 0.8;
	width: 4;
	z-index: 9999;
}

edge.faded {
	opacity: 0.06;
}

node {
	width: 40;
	height: 40;
	font-size: 9;
	font-weight: bold;
	min-zoomed-font-size: 4;
	label: data(name);
	text-wrap: wrap;
	text-max-width: 50;
	text-valign: center;
	text-halign: center;
	text-events: yes;
	color: #000;
	text-outline-width: 1;
	text-outline-color: #fff;
	text-outline-opacity: 1;
	overlay-color: #fff;
}

node[Instance = "achievement"] {
    background-color: #78559E;
    text-outline-color: #78559E;
}

node[Instance = "achievement_category"] {
    background-color: #2451C1;
    text-outline-color: #2451C1;
}

node[Instance = "achievement_collection"] {
    background-color: #4D2B46;
    text-outline-color: #4D2B46;
}

node[Instance = "action"] {
    background-color: #C772E2;
    text-outline-color: #C772E2;
}

node[Instance = "animation"] {
    background-color: #EE17C6;
    text-outline-color: #EE17C6;
}

node[Instance = "aspiration_category"] {
    background-color: #E350DB;
    text-outline-color: #E350DB;
}

node[Instance = "aspiration_track"] {
    background-color: #C020FC;
    text-outline-color: #C020FC;
}

node[Instance = "aspiration"] {
    background-color: #28B646;
    text-outline-color: #28B646;
}

node[Instance = "away_action"] {
    background-color: #AFADAC;
    text-outline-color: #AFADAC;
}

node[Instance = "balloon"] {
    background-color: #EC6A8F;
    text-outline-color: #EC6A8F;
}

node[Instance = "breed"] {
    background-color: #341D3F;
    text-outline-color: #341D3F;
}

node[Instance = "broadcaster"] {
    background-color: #DEBAFB;
    text-outline-color: #DEBAFB;
}

node[Instance = "bucks_perk"] {
    background-color: #EC3DA1;
    text-outline-color: #EC3DA1;
}

node[Instance = "buff"] {
    background-color: #6017E8;
    text-outline-color: #6017E8;
}

node[Instance = "business"] {
    background-color: #75D807;
    text-outline-color: #75D807;
}

node[Instance = "cas_menu_item"] {
    background-color: #CBA50F;
    text-outline-color: #CBA50F;
}

node[Instance = "cas_menu"] {
    background-color: #935A83;
    text-outline-color: #935A83;
}

node[Instance = "cas_preference_category"] {
    background-color: #CE04FC;
    text-outline-color: #CE04FC;
}

node[Instance = "cas_preference_item"] {
    background-color: #EC68FD;
    text-outline-color: #EC68FD;
}

node[Instance = "cas_stories_answer"] {
    background-color: #80F12D;
    text-outline-color: #80F12D;
}

node[Instance = "cas_stories_question"] {
    background-color: #3246B9;
    text-outline-color: #3246B9;
}

node[Instance = "cas_stories_trait_chooser"] {
    background-color: #8DAD15;
    text-outline-color: #8DAD15;
}

node[Instance = "call_to_action"] {
    background-color: #F537B2;
    text-outline-color: #F537B2;
}

node[Instance = "career_event"] {
    background-color: #944203;
    text-outline-color: #944203;
}

node[Instance = "career_gig"] {
    background-color: #CCDB0E;
    text-outline-color: #CCDB0E;
}

node[Instance = "career_level"] {
    background-color: #2C70AD;
    text-outline-color: #2C70AD;
}

node[Instance = "career_track"] {
    background-color: #48C75C;
    text-outline-color: #48C75C;
}

node[Instance = "career"] {
    background-color: #73996B;
    text-outline-color: #73996B;
}

node[Instance = "clan"] {
    background-color: #DEBEE6;
    text-outline-color: #DEBEE6;
}

node[Instance = "clan_value"] {
    background-color: #998ED0;
    text-outline-color: #998ED0;
}

node[Instance = "club_interaction_group"] {
    background-color: #FA0FFA;
    text-outline-color: #FA0FFA;
}

node[Instance = "club_seed"] {
    background-color: #2F59B4;
    text-outline-color: #2F59B4;
}

node[Instance = "conditional_layer"] {
    background-color: #9183DC;
    text-outline-color: #9183DC;
}

node[Instance = "detective_clue"] {
    background-color: #537449;
    text-outline-color: #537449;
}

node[Instance = "developmental_milestone"] {
    background-color: #C5224F;
    text-outline-color: #C5224F;
}

node[Instance = "drama_node"] {
    background-color: #2553F4;
    text-outline-color: #2553F4;
}

node[Instance = "ensemble"] {
    background-color: #B98811;
    text-outline-color: #B98811;
}

node[Instance = "game_ruleset"] {
    background-color: #E1477E;
    text-outline-color: #E1477E;
}

node[Instance = "headline"] {
    background-color: #F40120;
    text-outline-color: #F40120;
}

node[Instance = "holiday_definition"] {
    background-color: #E316F6;
    text-outline-color: #E316F6;
}

node[Instance = "holiday_tradition"] {
    background-color: #3FCD24;
    text-outline-color: #3FCD24;
}

node[Instance = "household_milestone"] {
    background-color: #3972E6;
    text-outline-color: #3972E6;
}

node[Instance = "interaction"] {
    background-color: #E882D2;
    text-outline-color: #E882D2;
}

node[Instance = "lot_decoration_preset"] {
    background-color: #DE1EF8;
    text-outline-color: #DE1EF8;
}

node[Instance = "lot_decoration"] {
    background-color: #FE2DB1;
    text-outline-color: #FE2DB1;
}

node[Instance = "lot_tuning"] {
    background-color: #D8800D;
    text-outline-color: #D8800D;
}

node[Instance = "mood"] {
    background-color: #BA7B60;
    text-outline-color: #BA7B60;
}

node[Instance = "narrative"] {
    background-color: #3E753C;
    text-outline-color: #3E753C;
}

node[Instance = "notebook_entry"] {
    background-color: #9902FA;
    text-outline-color: #9902FA;
}

node[Instance = "object_part"] {
    background-color: #7147A3;
    text-outline-color: #7147A3;
}

node[Instance = "object_state"] {
    background-color: #5B0281;
    text-outline-color: #5B0281;
}

node[Instance = "object"] {
    background-color: #B61DE6;
    text-outline-color: #B61DE6;
}

node[Instance = "objective"] {
    background-color: #69453E;
    text-outline-color: #69453E;
}

node[Instance = "open_street_director"] {
    background-color: #4B6FDE;
    text-outline-color: #4B6FDE;
}

node[Instance = "pie_menu_category"] {
    background-color: #3E9D96;
    text-outline-color: #3E9D96;
}

node[Instance = "posture"] {
    background-color: #AD6FDF;
    text-outline-color: #AD6FDF;
}

node[Instance = "rabbit_hole"] {
    background-color: #B16AD2;
    text-outline-color: #B16AD2;
}

node[Instance = "recipe"] {
    background-color: #EB97F8;
    text-outline-color: #EB97F8;
}

node[Instance = "region"] {
    background-color: #51E7A1;
    text-outline-color: #51E7A1;
}

node[Instance = "relbit"] {
    background-color: #904DF1;
    text-outline-color: #904DF1;
}

node[Instance = "relationship_lock"] {
    background-color: #AE34E6;
    text-outline-color: #AE34E6;
}

node[Instance = "reward"] {
    background-color: #6FA498;
    text-outline-color: #6FA498;
}

node[Instance = "role_state"] {
    background-color: #E4D15F;
    text-outline-color: #E4D15F;
}

node[Instance = "royalty"] {
    background-color: #37EF2E;
    text-outline-color: #37EF2E;
}

node[Instance = "season"] {
    background-color: #C98DD4;
    text-outline-color: #C98DD4;
}

node[Instance = "service_npc"] {
    background-color: #9CC212;
    text-outline-color: #9CC212;
}

node[Instance = "sickness"] {
    background-color: #C3FBD8;
    text-outline-color: #C3FBD8;
}

node[Instance = "sim_filter"] {
    background-color: #6E0DDA;
    text-outline-color: #6E0DDA;
}

node[Instance = "sim_info_fixup"] {
    background-color: #E25818;
    text-outline-color: #E25818;
}

node[Instance = "sim_template"] {
    background-color: #CA4C78;
    text-outline-color: #CA4C78;
}

node[Instance = "situation_goal_set"] {
    background-color: #9DF2F1;
    text-outline-color: #9DF2F1;
}

node[Instance = "situation_goal"] {
    background-color: #598F28;
    text-outline-color: #598F28;
}

node[Instance = "situation_job"] {
    background-color: #9C0785;
    text-outline-color: #9C0785;
}

node[Instance = "situation"] {
    background-color: #FBC3AE;
    text-outline-color: #FBC3AE;
}

node[Instance = "slot_type_set"] {
    background-color: #3F1635;
    text-outline-color: #3F1635;
}

node[Instance = "slot_type"] {
    background-color: #69A5DA;
    text-outline-color: #69A5DA;
}

node[Instance = "snippet"] {
    background-color: #7DF216;
    text-outline-color: #7DF216;
}

node[Instance = "social_group"] {
    background-color: #2E47A1;
    text-outline-color: #2E47A1;
}

node[Instance = "spell"] {
    background-color: #1F3413;
    text-outline-color: #1F3413;
}

node[Instance = "scommodity"] {
    background-color: #510776;
    text-outline-color: #510776;
}

node[Instance = "statistic"] {
    background-color: #339BC5;
    text-outline-color: #339BC5;
}

node[Instance = "strategy"] {
    background-color: #6224C9;
    text-outline-color: #6224C9;
}

node[Instance = "street"] {
    background-color: #F6E4CB;
    text-outline-color: #F6E4CB;
}

node[Instance = "subroot"] {
    background-color: #B7FF8F;
    text-outline-color: #B7FF8F;
}

node[Instance = "tag_set"] {
    background-color: #493953;
    text-outline-color: #493953;
}

node[Instance = "template_chooser"] {
    background-color: #48C2D5;
    text-outline-color: #48C2D5;
}

node[Instance = "test_based_score"] {
    background-color: #4F739C;
    text-outline-color: #4F739C;
}

node[Instance = "topic"] {
    background-color: #738E6C;
    text-outline-color: #738E6C;
}

node[Instance = "trait"] {
    background-color: #CB5FDD;
    text-outline-color: #CB5FDD;
}

node[Instance = "null"] {
    background-color: #3B33DD;
    text-outline-color: #3B33DD;
}

node[Instance = "tutorial_tip"] {
    background-color: #8FB3E0;
    text-outline-color: #8FB3E0;
}

node[Instance = "tutorial"] {
    background-color: #E04A24;
    text-outline-color: #E04A24;
}

node[Instance = "university_course_data"] {
    background-color: #291CAF;
    text-outline-color: #291CAF;
}

node[Instance = "university_major"] {
    background-color: #2758B3;
    text-outline-color: #2758B3;
}

node[Instance = "university"] {
    background-color: #D958D5;
    text-outline-color: #D958D5;
}

node[Instance = "user_interface_info"] {
    background-color: #B8BF1A;
    text-outline-color: #B8BF1A;
}

node[Instance = "venue"] {
    background-color: #E6BBD7;
    text-outline-color: #E6BBD7;
}

node[Instance = "walk_by"] {
    background-color: #3FD624;
    text-outline-color: #3FD624;
}

node[Instance = "weather_event"] {
    background-color: #5806F5;
    text-outline-color: #5806F5;
}

node[Instance = "weather_forecast"] {
    background-color: #497F32;
    text-outline-color: #497F32;
}

node[Instance = "whim"] {
    background-color: #749A06;
    text-outline-color: #749A06;
}

node[Instance = "zone_director"] {
    background-color: #F958A0;
    text-outline-color: #F958A0;
}

node[Instance = "zone_modifier"] {
    background-color: #3C1D87;
    text-outline-color: #3C1D87;
}

node.highlighted {
	min-zoomed-font-size: 0;
	z-index: 9999;
}

node.faded {
	opacity: 0.08;
}

.hidden {
	display: none;
}

`;
