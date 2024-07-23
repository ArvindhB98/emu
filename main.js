$(document).ready(function () {
    function openModal(buttonId, modalId) {
        $(buttonId).on('click', function () {
            $(modalId).modal('show');
        });
    }

    openModal('#openRemarksModal', '#remarksModal');
    openModal('#openDelegateModal', '#delegateModal');
    openModal('#openShareModal', '#shareModal');
    openModal('#openCommentModal', '#commentModal');
    openModal('#openAddSign', '#addSignModal');
    $('.okay-btn').on('click', function () {
        $('#signatureModal').modal('hide');
    });
    let comments = [];
    let editIndex = -1;

    function renderComments() {
        $('.comment-text').empty();
        comments.map((comment, index) => {
            var currentDateTime = comment.timestamp;
            var commentHtml = `
                <div class="form-control comment-default comment-list p-3 mb-4">
                    <p class="edit-text comment-head">${comment.text}</p>
                    <p class="comment-person">Tejas Sarpotdar <span class="user-comment">(You)</span></p>
                    <span class="comment-date">${currentDateTime}</span>
                    <div class="d-flex align-items-center gap-2 mt-2">
                        <button class="edit-link" data-index="${index}">
                            <img src="../../assets/vectors/edit.svg"> 
                            Edit 
                        </button>
                        <button class="delete-link" data-index="${index}">
                            <img src="../../assets/vectors/Trash.svg">
                            Delete
                        </button>
                    </div>
                </div>
            `;
            $('.comment-text').append(commentHtml);
        });

        if (comments.length > 0) {
            $('.comment-text').css("display", "block");
        } else {
            $('.comment-text').css("display", "none");
        }
    }

    $('#postCommentBtn').click(function() {
        var commentText = $('#commentReason').val().trim();
        var currentDate = new Date().toLocaleString('en-US', {
            month: 'short', 
            day: '2-digit', 
            year: 'numeric'
        }).replace(',', '');
        var currentTime = new Date().toLocaleString('en-US', {
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: false
        });
        var currentDateTime = `${currentDate} | ${currentTime}`;

        if (commentText.length > 0) {
            if (editIndex === -1) {
                comments.push({ text: commentText, timestamp: currentDateTime });
            } else {
                comments[editIndex].text = commentText;
                comments[editIndex].timestamp = currentDateTime;
                editIndex = -1;
                $('#postCommentBtn').text('Post');
            }
            renderComments();
            $('#commentReason').val('');
        }
    });

    $(document).on('click', '.edit-link', function(){
        editIndex = $(this).data('index');
        var comment = comments[editIndex];
        $('#commentReason').val(comment.text).focus();
        $('#postCommentBtn').text('Update');
    });

    $(document).on('click', '.delete-link', function(){
        var index = $(this).data('index');
        comments.splice(index, 1);
        renderComments();
        $('#commentReason').val('');
        $('#postCommentBtn').text('Post');
    });

    $('.comment-text').hide();
    $('.companyNameList').hide();
    $('.cg-companyNameList').hide();
    let companies = ["EMUDHRA LTD-12345677","eMudhra NBD- 190419786","Emirates Airlines- 98090","EMUDHRA LTD-12345677","eMudhra NBD- 190419786","Emirates Airlines- 98090"];
    let selectedco
    companies.map((company)=>{
        var listItem = company
        var htmlContent = `
        <div class="listItem" style="width:100%; padding:6px 3px; color:#525252;">${company}</div>
        `
        $('.searchList').append(htmlContent)
    })
    // $('.searchList').hide();
    $('.companySearchArrow').css('transform', 'rotate(180deg)')
    $(document).on('click', '.companySearchList', function() {
        $('.companyNameList').toggle();
        var $arrow = $('.companySearchArrow');
            if ($arrow.css('transform') == 'none' || $arrow.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
                $arrow.css('transform', 'rotate(180deg)');
            } else {
                $arrow.css('transform', 'rotate(0deg)');
            }
    });
    $(document).on('click', '.listItem', function() {
        $('.companySearchList').val($(this).text());
        $('.companyNameList').hide();
    });
    $(document).on('input', '.companySearchInput', function() {
        if($(this).val().length > 3){
            $('.searchList').show();
        }else{
            // $('.searchList').hide();
        }
    });
    let groupName = ""
    $(document).on('input', '.groupNameInput', function() {
        groupName = $(this).val()
        console.log(groupName)
    });
   
    companies.map((company)=>{
        var listItem = company
        var htmlContent = `
        <div class="listItem" style="width:100%; padding:6px 3px;">${company}</div>
        `
        $('.cg-searchList').append(htmlContent)
    })
    // $('.searchList').hide();
    $('.cg-companySearchArrow').css('transform', 'rotate(180deg)');
    $(document).on('click', '.cg-companySearchList', function() {
        $('.cg-companyNameList').toggle();
        var $arrow = $('.cg-companySearchArrow');
            if ($arrow.css('transform') == 'none' || $arrow.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
                $arrow.css('transform', 'rotate(180deg)');
            } else {
                $arrow.css('transform', 'rotate(0deg)');
            }
    });
    $(document).on('click', '.listItem', function() {
        $('.cg-companySearchList').val($(this).text());
        $('.cg-companyNameList').hide();
    });
    $(document).on('input', '.cg-companySearchInput', function() {
        if($(this).val().length > 3){
            $('.cg-searchList').show();
        }else{
            // $('.searchList').hide();
        }
    });
    let signatoryDetails = [
        {
            name:"Tejas",
            mail:"tejas@gmail.com",
            company:"Emudhra LTD",
            num:"289289",
            pfp:"../../../assets/images/pfp1.png"
        },
        {
            name:"Akhil",
            mail:"akhil@gmail.com",
            company:"Emudhra Co",
            num:"783023",
            pfp:"../../../assets/images/signatory profile.png"
        },
        {
            name:"ManjuNath Bath",
            mail:"manjunath@gmail.com",
            company:"Emirates",
            num:"9882023",
            pfp:"../../../assets/images/pfp2.png"
        }
    ]
    signatoryDetails.map((signatory,index)=>{
        var listItem = signatory
        var htmlContent = `
        <div class="d-flex w-100 py-1 pt-3 justify-content-between align-items-center signatoryItem" style="${index==signatoryDetails.length-1 ? "" :"border-bottom: 1px solid #ececec;"}">
            <label class="d-flex gap-3 w-100 align-items-center" for="signatoryCheck-${listItem.num}">
                <img height="50px" width="50px" src="${listItem.pfp}" alt="pfp"/>
                <div class="d-flex flex-column gap-0">
                    <h5 style="font-size: 16px; color: #565353">${listItem.name}</h5>
                    <p style="line-height: 5px; color: #565353">${listItem.mail}</p>
                    <p style="line-height: 5px; color: #565353">${listItem.company}</p>
                    <p style="line-height: 5px; color: #565353">${listItem.num}</p>
                </div>
            </label>
            <div class="px-2 mx-3">
                <input class="form-check-input shadow-none signatoryCheck" type="checkbox" id="signatoryCheck-${listItem.num}"  data-signatory='${JSON.stringify(listItem)}'>
            </div>
        </div>
        `
        $('.signatoryList').append(htmlContent)
    })
    $('.signatoryDetails').hide();
    $(document).on('click', '.signatoryListSearch', function() {
        $('.signatoryDetails').toggle();
    });
    signatoryDetails.map((signatory,index)=>{
        var listItem = signatory
        var htmlContent = `
        <div class="d-flex w-100 py-1 pt-3 justify-content-between align-items-center cg-signatoryItem" style="${index==signatoryDetails.length-1 ? "" :"border-bottom: 1px solid #ececec;"}">
            <label class="d-flex gap-3 w-100 align-items-center" for="cg-signatoryCheck-${listItem.num}">
                <img height="50px" width="50px" src="${signatory.pfp}" alt="pfp"/>
                <div class="d-flex flex-column gap-0">
                    <h5 style="font-size: 16px; color: #565353">${listItem.name}</h5>
                    <p style="line-height: 5px; color: #565353">${listItem.mail}</p>
                    <p style="line-height: 5px; color: #565353">${listItem.company}</p>
                    <p style="line-height: 5px; color: #565353">${listItem.num}</p>
                </div>
            </label>
            <div class="px-2 mx-3">
                <input class="form-check-input shadow-none cg-signatoryCheck" type="checkbox" id="cg-signatoryCheck-${listItem.num}" data-signatory='${JSON.stringify(listItem)}'>
            </div>
        </div>
        `
        $('.cg-signatoryList').append(htmlContent)
    })
    $('.cg-signatoryDetails').hide();
    $(document).on('click', '.cg-signatoryListSearch', function() {
        $('.cg-signatoryDetails').toggle();
    });
    $(document).on('keydown', '.cg-signatoryListSearch', function(event) {
        if (event.key === 'Enter') {
            $('.cg-signatoryDetails').hide();
            $(this).blur(); // Remove focus from the input field
        }
    });
    $(document).on('keydown', '.signatoryListSearch', function(event) {
        if (event.key === 'Enter') {
            $('.signatoryDetails').hide();
            $(this).blur(); // Remove focus from the input field
        }
    });
    $('.cg-signatoryListSearch')
    let selectedItems = []
    
    $('.okay-btn').on('click', function () {
        $('#createGroupModal').modal('hide');
    });
    $('.cg-signatoryList').on('change', '.cg-signatoryCheck', function() {
        let signatory = JSON.parse($(this).attr('data-signatory'));
        if ($(this).is(':checked')) {
            // Add to selected array
            selectedItems.push(signatory);
        } else {
            // Remove from selected array
            selectedItems = selectedItems.filter(item => item.num !== signatory.num);
        }
        console.log(selectedItems);
        if(selectedItems.length == 0){
            $('.cg-noSigns').show();
            $('.cg-items').hide();

        }else{
            $('.cg-noSigns').hide();
            $('.cg-items').show();
        }
        updateSelectedItems();
    });
    if(selectedItems.length == 0){
        $('.cg-items').hide();

    }else{
        $('.cg-items').show();
    }
    function updateSelectedItems() {
        // Clear the selected items list
        $('.cg-selectedItems').html('');
        $('.cg-signatoryListSearch').focus()
        // Generate and append the new list of selected items
        selectedItems.map(signatory => {
            var htmlContent = `
            <div class="d-flex w-100 justify-content-between align-items-center py-2" style="background-color: #F2F5FB;">
                <label class="d-flex gap-3 w-100 align-items-center" for="signatoryCheck">
                    <img height="50px" width="50px" src="${signatory.pfp}" alt="pfp"/>
                    <div class="d-flex flex-column gap-0">
                        <h5 style="font-size: 16px;">${signatory.name}</h5>
                        <p style="line-height: 5px; color: #494949;">${signatory.mail}</p>
                    </div>
                </label>
                <div class="px-2 d-flex gap-2">
                    <img src="../../../assets/vectors/Trash.svg"/>
                    <img src="../../../assets/vectors/menu.svg"/>
                </div>
            </div>
            `;
            $('.cg-selectedItems').append(htmlContent);
        });
       
    }
    let individual_selectedItems = []
    $('.signatoryList').on('change', '.signatoryCheck', function() {
        let signatory = JSON.parse($(this).attr('data-signatory'));
        if ($(this).is(':checked')) {
            // Add to selected array
            individual_selectedItems.push(signatory);
        } else {
            // Remove from selected array
            individual_selectedItems = individual_selectedItems.filter(item => item.num !== signatory.num);
        }
        console.log(individual_selectedItems);
        if(individual_selectedItems.length == 0){
            $('.noSigns').show();
            $('.AddSignsBtn').prop('disabled', true);

        }else{
            $('.noSigns').hide();
            $('.AddSignsBtn').prop('disabled', false);
        }
        updateindividualSelectedItems();
    });
    
    function updateindividualSelectedItems() {
        $('.signatoryListSearch').focus()
        // Clear the selected items list
        $('.individual_selectedItems').html('');
        
        // Generate and append the new list of selected items
        individual_selectedItems.map(signatory => {
            var htmlContent = `
            <div class="d-flex w-100 justify-content-between align-items-center py-2 rounded-2" style="background-color: #F2F5FB;">
                <label class="d-flex gap-3 w-100 align-items-center" for="signatoryCheck">
                    <img height="50px" width="50px" src="${signatory.pfp}" alt="pfp"/>
                    <div class="d-flex flex-column gap-0">
                        <h5 style="font-size: 16px;">${signatory.name}</h5>
                        <p style="line-height: 5px; color: #494949;">${signatory.mail}</p>
                    </div>
                </label>
                <div class="px-2 d-flex gap-2">
                    <img src="../../../assets/vectors/Trash.svg"/>
                    <img src="../../../assets/vectors/menu.svg"/>
                </div>
            </div>
            `;
            $('.individual_selectedItems').append(htmlContent);
        });
        localStorage.setItem("individual_selectedItems",JSON.stringify(individual_selectedItems))
    }
    let selectedSignatory = []
    selectedSignatory = JSON.parse(localStorage.getItem("selectedSignatory")) || []
    selectedSignatory = selectedSignatory.filter((signatory, index, self) =>
        index === self.findIndex((t) => (
           t.name === signatory.name
        ))
    );
    function updateSelectedSignatoryList(){
        selectedSignatory.map((signatory,index)=>{
            let htmlContent = signatory.size ? `
            <div class="d-flex w-100 justify-content-between align-items-center py-2  rounded-2 my-2" style="background-color: #F2F5FB; signatoryItemG">
                <label class="d-flex gap-3 w-100 align-items-center" for="signatoryCheck">
                    <img height="50px" width="50px" src="../../assets/images/grouppfp.png" alt="pfp"/>
                    <div class="d-flex flex-column gap-0">
                        <h5 style="font-size: 16px;">${signatory.name}</h5>
                        <p style="line-height: 5px; color:  #6A6F79;">${signatory.size} participants</p>
                        <p style="line-height: 5px; color: #6A6F79; ">Signer</p>
                    </div>
                </label>
                <div class="px-2 d-flex gap-2">
                    <img id="deleteSelectedSign" class="deleteSelectedSign${signatory.name.replace(/\s+/g, '')}" data-name=${signatory.name.replace(/\s+/g, '')} src="../../assets/vectors/Trash.svg"/>
                    <img src="../../assets/vectors/menu.svg"/>
                </div>
            </div>
            ` : `
            <div class="d-flex w-100 justify-content-between align-items-center py-2  rounded-2 my-2" style="background-color: #F2F5FB;">
                <label class="d-flex gap-3 w-100 align-items-center" for="signatoryCheck">
                    <img height="50px" width="50px" src="${signatory.pfp.substring(3)}" alt="pfp"/>
                    <div class="d-flex flex-column gap-0">
                        <h5 style="font-size: 16px;">${signatory.name}</h5>
                        <p style="line-height: 5px; color:  #6A6F79;">${signatory.mail}</p>
                        <p style="line-height: 5px; color:  #6A6F79;">Signer</p>
                    </div>
                </label>
                <div class="px-2 d-flex gap-2">
                    <img id="deleteSelectedSign" class="deleteSelectedSign${signatory.name.replace(/\s+/g, '')}" data-name=${signatory.name.replace(/\s+/g, '')} src="../../assets/vectors/Trash.svg"/>
                    <img src="../../assets/vectors/menu.svg"/>
                </div>
            </div>
            `
            $('.selectedSignList').append(htmlContent);
            $(`.deleteSelectedSign${signatory.name.replace(/\s+/g, '')}`).on('click', function() {
                let className = $(`.deleteSelectedSign${signatory.name.replace(/\s+/g, '')}`).attr('class');
                    // Find the element with that class and get its 'data-name' attribute
                let dataName = $(`.${className}`).attr('data-name');
                removeItemByName(dataName,selectedSignatory,'selectedSignatory')
            })
        })
    }
    updateSelectedSignatoryList()
    function AddSelectedSignatory(type){
        selectedSignatory = JSON.parse(localStorage.getItem("selectedSignatory")) || []
        if(type=="group"){
            selectedSignatory.push({name:groupName ? groupName : "Test Group",size:selectedItems.length})
        }
        if(type=="individual"){
            individual_selectedItems.forEach((item) => {
                selectedSignatory?.push(item);
            });
           
        }
        localStorage.setItem('selectedSignatory',JSON.stringify(selectedSignatory));
        console.log(selectedSignatory);
        window.location.href = '../index.html';
    }
    $('.createGroupModalBtn').click(function() {   
        if (selectedItems.length <= 1) {
            $('#createGroupModal').modal('show');
        }else{
            AddSelectedSignatory("group")
        }
    });
    $('.AddSignsBtn').click(function() {
        AddSelectedSignatory("individual")
        window.location.href = '../index.html';
        console.log(localStorage.getItem("selectedSignatory"))
       
    });
    if((selectedSignatory?.length==0)){
        $('.noSignList').show();
        $('.SignList').hide();

    }else{
        $('.noSignList').hide();
        $('.SignList').show();
    }
    const selectedSign = JSON.parse(localStorage.getItem('selectedSignatory')) || [];
    
    if (selectedSign.length !== 0) {
        // Show next and change Add sign button style
        $("#AddSignatories").addClass("AddSignatories-secondary");
        $('#signNext').show()
    } else {
        $("#AddSignatories").removeClass("AddSignatories-secondary");
        $('#signNext').hide()
    }
    $('#docSidepreviewBtn').click(function() {
        $(".doc-sidebar").toggleClass("doc-sidebaropen");
    });
    let isEstamping = false
    $('#toggleSwitch1').change(function() {
        if (this.checked) {
            isEstamping = true
            $('.ApplyEstampingBtn').prop('disabled', false);
        } else {
            isEstamping = false
            $('.ApplyEstampingBtn').prop('disabled', true);
        }
    });
   
    function removeItemByName(name,arr,arrName) {
        // alert(name)
        const index = arr.findIndex(item => item.name.replace(/\s+/g, '').toLowerCase() === name.toLowerCase());
        if (index !== -1) {
            arr.splice(index, 1);
        }
        localStorage.setItem(arrName,JSON.stringify(arr))
        window.location.reload()
    }
    const highlightMatches = (search,searchListName) => {
        const regex = new RegExp(`(${search})`, 'gi'); // Create a case-insensitive regex
        $(`.${searchListName} div`).each(function() {
            const text = $(this).text();
            const highlightedText = text.replace(regex, '<span class="highlight-SearchText">$1</span>');
            $(this).html(highlightedText);
        });
    };
    const highlightMatches2 = (search,searchListName) => {
        const regex = new RegExp(`(${search})`, 'gi'); // Create a case-insensitive regex
        
        let matchingDivs = [];

        // Iterate over each h5 element to check for matches
        $(`.${searchListName} div label div h5`).each(function() {
            const text = $(this).text();
            if (regex.test(text)) {
                // Highlight the text
                const highlightedText = text.replace(regex, '<span class="highlight-SearchText">$1</span>');
                $(this).html(highlightedText);
                // Add the second closest div to the array
                matchingDivs.push($(this).parents('div').eq(1).detach()); // Adjust this if needed
            } else {
                // Reset non-matching items to their original state
                $(this).html(text);
            }
        });
        $(`.${searchListName}`).prepend(matchingDivs);
        $(`.${searchListName} div label div`).each(function() {
            const $firstP = $(this).find('p').first();
            const text = $firstP.text();
            if (regex.test(text)) {
                // Highlight the text
                const highlightedText = text.replace(regex, '<span class="highlight-SearchText">$1</span>');
                $firstP.html(highlightedText);

            } else {
                // Reset non-matching items to their original state
                $firstP.html(text);
            }
        });
    };

    $('.companySearchInput').on('input', function() {
        const search = $(this).val();
        console.log(search)
        highlightMatches(search,"searchList");
    });
    $('.cg-companySearchInput').on('input', function() {
        const search = $(this).val();
        console.log(search)
        highlightMatches(search,"cg-searchList");
    });
    $('.signatoryListSearch').on('input', function() {
        const search = $(this).val();
        console.log(search)
        highlightMatches2(search,"signatoryList");
    });
    $('.cg-signatoryListSearch').on('input', function() {
        const search = $(this).val();
        console.log(search)
        highlightMatches2(search,"cg-signatoryList");
    });
});


