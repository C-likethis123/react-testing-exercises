# Explanation for useOnClickOutside

## What does the hook do

It allows you to detect clicks outside a specific element. For a code example, see: https://usehooks.com/useOnClickOutside/

## How it's tested

A nice way to test this hook is to create a small component and render the hook in the component. When the handler is attached to the inner component through a ref, clicking on the inner element should not trigger the handler. Clicking on anything outside the handler should trigger the call.


Note: 
Using `screen.getByText("I'm Inside!").click()` to trigger the click does not work, as the `click()` method only triggers a 'click' event. The event listeners attached in the hook looks out for a "mousedown" event.

Instead, use `userEvent` as it triggers multiple actions. See an explanation here: https://stackoverflow.com/questions/65735681/react-testing-library-differences-between-clicks-using-userevent-fireevent-and

