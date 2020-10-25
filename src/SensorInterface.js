import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import Container from "@material-ui/core/Container";
import React from "react";
import RobotInterface from "./RobotInterface";

const styles = {

	largeIcon: {
		width: 500,
		height: 500,
	},

};



function SensorInterface(){
	return(
		<div>

			<CheckBoxOutlineBlankOutlinedIcon id = 'sensor0'></CheckBoxOutlineBlankOutlinedIcon>
			<CheckBoxOutlineBlankOutlinedIcon id = 'sensor1'></CheckBoxOutlineBlankOutlinedIcon>

		</div>
	)
}
export default SensorInterface;
