// 'use strict';
const formField = document.getElementById('form');
const email = document.getElementById('email');
const card = document.querySelector('.card');
const successMessage = document.querySelector('.success');
const dissmissMessageBtn = document.querySelector('.success__button');
const successLink = document.querySelector('.success__text-link');
// preserve original success link text/href so we can restore on dismiss
const originalSuccessLinkText = successLink ? successLink.textContent : '';
const originalSuccessLinkHref = successLink
	? successLink.getAttribute('href') || '#'
	: '#';

if (formField && email && card && successMessage) {
	formField.addEventListener('submit', function (e) {
		e.preventDefault();
		const value = email.value;
		console.log(value);
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const valueTrimmed = value.trim();
		if (!emailRegex.test(valueTrimmed) || value.trim() === '') {
			formField.classList.add('error');
		} else {
			// expose the submitted email
			window.submittedEmail = value;
			// update success message link text and mailto href (if present in DOM)
			if (successLink) {
				successLink.textContent = value;
				successLink.setAttribute('href', `mailto:${value}`);
			}
			card.classList.add('hidden');
			successMessage.classList.remove('hidden');
			// move focus to dismiss button for accessibility
			if (
				dissmissMessageBtn &&
				typeof dissmissMessageBtn.focus === 'function'
			) {
				dissmissMessageBtn.focus();
			}
		}
	});

	// remove error state as soon as the user starts typing
	email.addEventListener('input', function () {
		if (formField.classList.contains('error')) {
			formField.classList.remove('error');
		}
	});
}
function handleDissmissMessage() {
	dissmissMessageBtn.addEventListener('click', function () {
		card.classList.remove('hidden');
		successMessage.classList.add('hidden');
		// clear the input and any error state when dismissing
		if (email) {
			email.value = '';
		}
		if (formField) {
			formField.classList.remove('error');
		}
		// reset exposed value
		if (window.submittedEmail) {
			window.submittedEmail = undefined;
		}
		// restore original success link text/href
		if (successLink) {
			successLink.textContent = originalSuccessLinkText;
			successLink.setAttribute('href', originalSuccessLinkHref);
		}
		// move focus back to the email input for easy keyboard continue
		if (email && typeof email.focus === 'function') {
			email.focus();
		}
	});
}
handleDissmissMessage();
