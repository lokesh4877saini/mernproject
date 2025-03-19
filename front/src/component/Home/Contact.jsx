import './Contact.scss';
const Contact = () => {
    return (<>
    <form action="">
        <div class="container">
            <div class="header"> <h2>Contact Us</h2></div>
            <div class="menu">
                <div className="Email">
                    <lable htmlFor="Email">Email</lable>
                    <input type="email" name="" id="Email" placeholder="type email ..." />
                </div>
            </div>
            <div class="content"> <label htmlFor="FullName">FullName</label>
                <input type="text" name="" id="FullName" placeholder="type fullname ..." />
                <lable htmlFor="LastName">LastName</lable>
                <input type="text" name="" id="LastName" placeholder="type lastname ..." /></div>
            <div class="footer">
                <lable htmlFor="message">message</lable>
                <textarea name="" id="message" cols="30" rows="10" placeholder="type message ..."></textarea>
            </div>
        </div>
        <button type="submit">Send</button>
    </form>
    </>)
}
export default Contact;