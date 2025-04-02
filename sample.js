/* Reset default margin and ensure full height */
html, body {
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
}

/* Ensures main content fills remaining space */
.main-content {
    flex: 1;
    min-height: calc(100vh - 8rem); /* Adjusts based on footer height */
}

/* Footer styling */
footer {
    width: 100%;
    background-color: #c0c0c0;
    text-align: center;
    padding: 1rem 0;
}

/* Footer sections */
.f-info {
    text-align: center;
    height: 8rem;
    background-color: #c0c0c0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 0;
}

/* Footer links */
.f-info-links, .f-info-socials, .f-info-brand {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

/* Social icons */
.f-info-socials i {
    margin: 0 10px;
    font-size: 1.5rem;
}

/* Footer links */
.f-info-links a {
    text-decoration: none;
    color: #222222;
    margin-left: 20px;
}

.f-info-links a:hover {
    text-decoration: underline;
}
