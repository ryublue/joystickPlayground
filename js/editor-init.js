( function ($) {
	var editor = ace.edit("transferFunctionEditor");
	editor.setTheme("ace/theme/xcode");
	var session = editor.getSession()
	session.setMode("ace/mode/javascript");
	session.setUseWrapMode(true);
	session.setWrapLimitRange(40, 45);
	editor.$blockScrolling = Infinity

	// remember the editor in our namespace
	config.tfEditor = editor;
} )(jQuery);