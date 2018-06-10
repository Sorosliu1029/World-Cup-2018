# All .js compiled into a single one.
compiled=./public/js/main.js

compile:
	@find ./src/web_js -type f -name "*.js" | xargs cat > $(compiled)