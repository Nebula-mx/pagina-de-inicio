let $shortcut = `
                    <li title="${el.title}" id="${i}">
                        <label class="editShorttcutBtn">
                            <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 18" width="4" height="18">
                                <title>editBtn-svg</title>
                                <style>
                                    .s0 { fill: #ffffff } 
                                </style>
                                <path id="Layer" class="s0" d="m0 9c0-1.1 0.9-2 2-2 1.1 0 2 0.9 2 2 0 1.1-0.9 2-2 2-1.1 0-2-0.9-2-2z"/>
                                <path id="Layer" class="s0" d="m0 16c0-1.1 0.9-2 2-2 1.1 0 2 0.9 2 2 0 1.1-0.9 2-2 2-1.1 0-2-0.9-2-2z"/>
                                <path id="Layer" class="s0" d="m0 2c0-1.1 0.9-2 2-2 1.1 0 2 0.9 2 2 0 1.1-0.9 2-2 2-1.1 0-2-0.9-2-2z"/>
                            </svg>
                        </label>
                        <div class="shortcutBody" data-url="${el.url}">
                            <img src="https://s2.googleusercontent.com/s2/favicons?sz=64&domain_url=${el.url}">
                            <legend>${el.title}</legend>
                        </div>
                    </li>
                `