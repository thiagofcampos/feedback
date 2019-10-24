import React from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import useStyles from './feedback-styles';

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

function MySnackbarContentWrapper(props) {
	const classes = useStyles();
	const { className, message, onClose, variant, ...other } = props;
	const Icon = !!variant ? variantIcon[variant] : null;

	const messageSpan = (msg) => <span id="client-snackbar" className={ classes.message }>
		<Icon className={ clsx(classes.icon, classes.iconVariant) } />
		{ msg }
	</span>

	return (
		!!variant ? <SnackbarContent
			className={ clsx(classes[variant], className) }
			aria-describedby="client-snackbar"
			message={
				Array.isArray(message) ?
					message.map(item =>
						messageSpan(item)
					)
					:
					messageSpan(message)
			}
			action={ [
				<IconButton key="close" aria-label="Close" color="inherit" onClick={ onClose }>
					<CloseIcon className={ classes.icon } />
				</IconButton>,
			] }
			{ ...other }
		/> : <div></div>
	);
}

export default function FeedbackComponent({
	type,
	message,
	handleCloseFeedback,
}) {
	return (
		<Snackbar
			anchorOrigin={ {
				vertical: 'top',
				horizontal: 'right',
			} }
			open={ !!message }
			autoHideDuration={ 6000 }
			onClose={ handleCloseFeedback }
		>
			<MySnackbarContentWrapper
				onClose={ handleCloseFeedback }
				variant={ type || "" }
				message={ message }
			/>
		</Snackbar>
	);
}
