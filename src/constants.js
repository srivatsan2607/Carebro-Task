import { TextField, withStyles } from "@material-ui/core";
import animationData from './assets/loading.json'


export const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice"
	}
};

const CssTextField = withStyles( {
	root: {
		'& label.Mui-focused': {
			color: 'green',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'green',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'black',
			},
			'&:hover fieldset': {
				borderColor: 'blue',
			},
			'&.Mui-focused fieldset': {
				borderColor: '#3DC3BF',
			},
		},
	},
} )( TextField );


const renderError = ( { touched, error, className } ) =>
{
	if ( touched && error )
	{
		return (
			<div>
				<div style={ { color: "red", fontSize: "10px", } }>{ error }</div>
			</div>
		);
	}
	return null;
};


export const renderInput = ( { label, input, className, meta, placeholder } ) =>
{
	return (
		<div>
			<CssTextField
				{ ...input }
				className={ className }
				label={ label }
				required={ true }
				placeholder={ placeholder }
				type="text"
				variant="outlined"
				margin="dense"
			/>
			{ renderError( meta ) }
		</div>
	);
};



export const productValidate = ( formValues ) =>
{
	const error = {};
	if ( !formValues.prodName )
	{
		error.prodName = "Please enter a product name";
	}
	if ( !formValues.brand )
	{
		error.brand = "Please enter a product brand";
	}
	if ( !formValues.prodImage )
	{
		error.prodImage = "Please enter a product image";
	}
	if ( !formValues.prodPrice )
	{
		error.prodPrice = "Please enter product price";
	}
	return error;
};


export const userData = [
	{
		name: 'Jan',
		"Active Users": 4000,
	},
	{
		name: 'Feb',
		"Active Users": 1278,
	},
	{
		name: 'Mar',
		"Active Users": 2000,
	},
	{
		name: 'Apr',
		"Active Users": 3400,
	},
	{
		name: 'May',
		"Active Users": 1234,
	},
	{
		name: 'June',
		"Active Users": 7222,
	},
	{
		name: 'Jul',
		"Active Users": 1000,
	},
	{
		name: 'Aug',
		"Active Users": 4999,
	},
	{
		name: 'Sep',
		"Active Users": 400,
	},
	{
		name: 'Oct',
		"Active Users": 2500,
	},
	{
		name: 'Nov',
		"Active Users": 3800,
	},
	{
		name: 'Dec',
		"Active Users": 1678,
	},
];